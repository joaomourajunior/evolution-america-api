const path = require('path');
const bcrypt = require('bcryptjs');
const { JSONFilePreset } = require('lowdb/node');

const DB_PATH = process.env.DB_PATH || path.join(__dirname, 'evolution-america.json');

const defaultData = {
  meta: { nextId: 1 },
  schools: [],       // { id, name, slug, city, state, active, created_at }
  users: [],         // { id, school_id, name, username, email, password_hash, role, active, created_at }
  passwordResets: [],// { id, user_id, token, expires_at, used, created_at }
  courses: [],       // { id, title, description }
  modules: [],       // { id, course_id, idx, title, level, level_label, description }
  lessons: [],       // { id, module_id, idx, title, duration, ready, content_visual, content_audio, content_kin }
  progress: [],       // { id, user_id, lesson_id, completed_at }
  evoiaConversations: [], // { id, user_id, role, message, created_at }
};

let db; // instância inicializada de forma assíncrona, ver init() abaixo

function nextId() {
  const id = db.data.meta.nextId;
  db.data.meta.nextId += 1;
  return id;
}

function nowIso() {
  return new Date().toISOString();
}

async function init() {
  db = await JSONFilePreset(DB_PATH, defaultData);
  if (db.data.schools.length === 0) {
    await seed();
  }
  return db;
}

async function seed() {
  console.log('[seed] Banco vazio — semeando escolas, usuários demo e catálogo de cursos...');

  const school1 = { id: nextId(), name: 'Colégio Atlas', slug: 'colegio-atlas', city: 'Sorocaba', state: 'SP', active: true, created_at: nowIso() };
  const school2 = { id: nextId(), name: 'Instituto Nova Era', slug: 'instituto-nova-era', city: 'Curitiba', state: 'PR', active: true, created_at: nowIso() };
  db.data.schools.push(school1, school2);

  const demoHash = bcrypt.hashSync('demo1234', 10);
  db.data.users.push(
    { id: nextId(), school_id: school1.id, name: 'Professor Demo', username: 'professor.demo', email: 'professor.demo@colegioatlas.com.br', password_hash: demoHash, role: 'professor', active: true, created_at: nowIso() },
    { id: nextId(), school_id: school1.id, name: 'Admin Atlas', username: 'admin', email: 'admin@colegioatlas.com.br', password_hash: demoHash, role: 'admin', active: true, created_at: nowIso() },
    { id: nextId(), school_id: school2.id, name: 'Professor Nova Era', username: 'professor.demo', email: 'professor.demo@novaera.com.br', password_hash: demoHash, role: 'professor', active: true, created_at: nowIso() },
  );

  const { COURSE, LESSON_CONTENT } = require('./data/course-data.js');

  const course = { id: COURSE.id, title: COURSE.title, description: COURSE.desc };
  db.data.courses.push(course);

  COURSE.modules.forEach((m, mi) => {
    const moduleId = `${COURSE.id}__${m.id}`;
    db.data.modules.push({
      id: moduleId, course_id: COURSE.id, idx: mi, title: m.title,
      level: m.level, level_label: m.levelLabel, description: m.desc,
    });
    m.lessons.forEach((l, li) => {
      const lessonKey = `m${mi + 1}-l${li + 1}`;
      const lessonId = `${moduleId}__l${li + 1}`;
      const content = LESSON_CONTENT[lessonKey] || {};
      db.data.lessons.push({
        id: lessonId, module_id: moduleId, idx: li, title: l.title, duration: l.duration,
        ready: !!l.ready, content_visual: content.visual || null,
        content_audio: content.audio || null, content_kin: content.kin || null,
      });
    });
  });

  await db.write();
  console.log('[seed] Concluído:', db.data.lessons.length, 'aulas semeadas.');
}

/* ======================= Helpers de acesso (substituem o SQL) ======================= */

const helpers = {
  // schools
  listActiveSchools: () => db.data.schools.filter(s => s.active),
  listAllSchoolsWithUserCount: () => db.data.schools.map(s => ({
    ...s, total_users: db.data.users.filter(u => u.school_id === s.id).length,
  })).sort((a, b) => new Date(b.created_at) - new Date(a.created_at)),
  getSchoolBySlug: (slug) => db.data.schools.find(s => s.slug === slug && s.active),
  getSchoolById: (id) => db.data.schools.find(s => s.id === id),
  createSchool: async ({ name, slug, city, state }) => {
    const school = { id: nextId(), name, slug, city: city || null, state: state || null, active: true, created_at: nowIso() };
    db.data.schools.push(school);
    await db.write();
    return school;
  },

  // users
  getUserByCredentials: (schoolId, username) =>
    db.data.users.find(u => u.school_id === schoolId && u.username === username && u.active),
  getUserById: (id) => db.data.users.find(u => u.id === id),
  getUserByEmail: (schoolId, email) =>
    db.data.users.find(u => u.school_id === schoolId && u.email === email && u.active),
  listUsersBySchool: (schoolId) => db.data.users.filter(u => u.school_id === schoolId),
  createUser: async ({ school_id, name, username, email, password_hash, role }) => {
    const user = { id: nextId(), school_id, name, username, email: email || null, password_hash, role, active: true, created_at: nowIso() };
    db.data.users.push(user);
    await db.write();
    return user;
  },
  updateUserPassword: async (userId, password_hash) => {
    const user = db.data.users.find(u => u.id === userId);
    if (user) { user.password_hash = password_hash; await db.write(); }
  },

  // password resets
  createPasswordReset: async ({ user_id, token, expires_at }) => {
    const reset = { id: nextId(), user_id, token, expires_at, used: false, created_at: nowIso() };
    db.data.passwordResets.push(reset);
    await db.write();
    return reset;
  },
  getValidPasswordReset: (token) =>
    db.data.passwordResets.find(r => r.token === token && !r.used),
  markPasswordResetUsed: async (id) => {
    const reset = db.data.passwordResets.find(r => r.id === id);
    if (reset) { reset.used = true; await db.write(); }
  },

  // courses / modules / lessons
  listCourses: () => db.data.courses,
  listModulesByCourse: (courseId) =>
    db.data.modules.filter(m => m.course_id === courseId).sort((a, b) => a.idx - b.idx),
  listLessonsByModule: (moduleId) =>
    db.data.lessons.filter(l => l.module_id === moduleId).sort((a, b) => a.idx - b.idx),
  getLessonById: (lessonId) => db.data.lessons.find(l => l.id === lessonId),

  // progress
  getCompletedLessonIds: (userId, lessonIds) => {
    const set = new Set(
      db.data.progress.filter(p => p.user_id === userId && lessonIds.includes(p.lesson_id)).map(p => p.lesson_id)
    );
    return set;
  },
  markLessonComplete: async (userId, lessonId) => {
    const exists = db.data.progress.find(p => p.user_id === userId && p.lesson_id === lessonId);
    if (!exists) {
      db.data.progress.push({ id: nextId(), user_id: userId, lesson_id: lessonId, completed_at: nowIso() });
      await db.write();
    }
  },
  removeLessonProgress: async (userId, lessonId) => {
    db.data.progress = db.data.progress.filter(p => !(p.user_id === userId && p.lesson_id === lessonId));
    await db.write();
  },
  getProgressSummary: (userId) => {
    const rows = db.data.progress.filter(p => p.user_id === userId);
    const totalCompleted = rows.length;
    const byModuleMap = {};
    rows.forEach(p => {
      const lesson = db.data.lessons.find(l => l.id === p.lesson_id);
      if (!lesson) return;
      byModuleMap[lesson.module_id] = (byModuleMap[lesson.module_id] || 0) + 1;
    });
    const byModule = Object.entries(byModuleMap).map(([module_id, completed_count]) => ({ module_id, completed_count }));
    return { totalCompleted, byModule };
  },

  // EVO IA conversations
  addEvoiaMessage: async (userId, role, message) => {
    db.data.evoiaConversations.push({ id: nextId(), user_id: userId, role, message, created_at: nowIso() });
    await db.write();
  },
  getEvoiaHistory: (userId) =>
    db.data.evoiaConversations
      .filter(c => c.user_id === userId)
      .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
      .slice(0, 200)
      .map(({ role, message, created_at }) => ({ role, message, created_at })),
};

module.exports = { init, helpers, bcrypt };
