const Database = require('better-sqlite3');
const path = require('path');
const bcrypt = require('bcryptjs');

const DB_PATH = process.env.DB_PATH || path.join(__dirname, 'evolution-america.db');
const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

function initSchema() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS schools (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      city TEXT,
      state TEXT,
      active INTEGER NOT NULL DEFAULT 1,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      school_id INTEGER NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
      name TEXT NOT NULL,
      username TEXT NOT NULL,
      email TEXT,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'student', -- 'admin' | 'professor' | 'student'
      active INTEGER NOT NULL DEFAULT 1,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      UNIQUE(school_id, username)
    );

    CREATE TABLE IF NOT EXISTS password_resets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      token TEXT NOT NULL UNIQUE,
      expires_at TEXT NOT NULL,
      used INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    -- Catálogo de cursos é global (mesmo conteúdo para todas as escolas)
    CREATE TABLE IF NOT EXISTS courses (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT
    );

    CREATE TABLE IF NOT EXISTS modules (
      id TEXT PRIMARY KEY,
      course_id TEXT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
      idx INTEGER NOT NULL,
      title TEXT NOT NULL,
      level TEXT NOT NULL,
      level_label TEXT NOT NULL,
      description TEXT
    );

    CREATE TABLE IF NOT EXISTS lessons (
      id TEXT PRIMARY KEY,
      module_id TEXT NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
      idx INTEGER NOT NULL,
      title TEXT NOT NULL,
      duration TEXT,
      ready INTEGER NOT NULL DEFAULT 0,
      content_visual TEXT,
      content_audio TEXT,
      content_kin TEXT
    );

    -- Progresso é isolado por escola através do student (users.school_id)
    CREATE TABLE IF NOT EXISTS progress (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      lesson_id TEXT NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
      completed_at TEXT NOT NULL DEFAULT (datetime('now')),
      UNIQUE(user_id, lesson_id)
    );

    CREATE TABLE IF NOT EXISTS evoia_conversations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      role TEXT NOT NULL, -- 'user' | 'assistant'
      message TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE INDEX IF NOT EXISTS idx_users_school ON users(school_id);
    CREATE INDEX IF NOT EXISTS idx_progress_user ON progress(user_id);
    CREATE INDEX IF NOT EXISTS idx_modules_course ON modules(course_id);
    CREATE INDEX IF NOT EXISTS idx_lessons_module ON lessons(module_id);
    CREATE INDEX IF NOT EXISTS idx_evoia_user ON evoia_conversations(user_id);
  `);
}

function seedIfEmpty() {
  const schoolCount = db.prepare('SELECT COUNT(*) AS c FROM schools').get().c;
  if (schoolCount > 0) return; // já tem dado, não semeia de novo

  console.log('[seed] Banco vazio — semeando escolas, usuários demo e catálogo de cursos...');

  const insertSchool = db.prepare(`INSERT INTO schools (name, slug, city, state) VALUES (?, ?, ?, ?)`);
  const school1 = insertSchool.run('Colégio Atlas', 'colegio-atlas', 'Sorocaba', 'SP');
  const school2 = insertSchool.run('Instituto Nova Era', 'instituto-nova-era', 'Curitiba', 'PR');

  const insertUser = db.prepare(`
    INSERT INTO users (school_id, name, username, email, password_hash, role)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  const demoHash = bcrypt.hashSync('demo1234', 10);
  insertUser.run(school1.lastInsertRowid, 'Professor Demo', 'professor.demo', 'professor.demo@colegioatlas.com.br', demoHash, 'professor');
  insertUser.run(school1.lastInsertRowid, 'Admin Atlas', 'admin', 'admin@colegioatlas.com.br', demoHash, 'admin');
  insertUser.run(school2.lastInsertRowid, 'Professor Nova Era', 'professor.demo', 'professor.demo@novaera.com.br', demoHash, 'professor');

  // catálogo de curso a partir dos dados reais do frontend
  const { COURSE, LESSON_CONTENT } = require('./data/course-data.js');

  db.prepare(`INSERT INTO courses (id, title, description) VALUES (?, ?, ?)`)
    .run(COURSE.id, COURSE.title, COURSE.desc);

  const insertModule = db.prepare(`
    INSERT INTO modules (id, course_id, idx, title, level, level_label, description)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);
  const insertLesson = db.prepare(`
    INSERT INTO lessons (id, module_id, idx, title, duration, ready, content_visual, content_audio, content_kin)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  COURSE.modules.forEach((m, mi) => {
    const moduleId = `${COURSE.id}__${m.id}`;
    insertModule.run(moduleId, COURSE.id, mi, m.title, m.level, m.levelLabel, m.desc);
    m.lessons.forEach((l, li) => {
      const lessonKey = `m${mi + 1}-l${li + 1}`;
      const lessonId = `${moduleId}__l${li + 1}`;
      const content = LESSON_CONTENT[lessonKey] || {};
      insertLesson.run(
        lessonId, moduleId, li, l.title, l.duration, l.ready ? 1 : 0,
        content.visual || null, content.audio || null, content.kin || null
      );
    });
  });

  console.log('[seed] Concluído:', db.prepare('SELECT COUNT(*) AS c FROM lessons').get().c, 'aulas semeadas.');
}

initSchema();
seedIfEmpty();

module.exports = db;
