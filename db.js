// db.js — banco de dados 100% JavaScript puro (lowdb), sem dependências nativas.
// Lição aprendida: better-sqlite3 causava Segmentation fault no Railway.
const path = require('path');
const bcrypt = require('bcryptjs');
const { nanoid } = require('nanoid');
const { Low } = require('lowdb');
const { JSONFile } = require('lowdb/node');
const { COURSE } = require('./course-data');

const DB_FILE = path.join(__dirname, 'evolution-america.json');

const defaultData = {
  course: null,
  escolas: [],       // { id, slug, nome, usuarios: [...], turmas: [...] }
  estudantes: [],     // { id, escolaId, turmaId, username, passwordHash, nome, progresso: {}, recommended_level }
  owner: null,        // { username, passwordHash }
  suggestions: [],    // { id, escolaId, escolaNome, autor, mensagem, criadoEm, status }
  ownerVisitLog: [],  // { id, quando, acao, escolaId, escolaNome, detalhe }
};

let dbInstance = null;

async function getDb() {
  if (dbInstance) return dbInstance;
  const adapter = new JSONFile(DB_FILE);
  const db = new Low(adapter, defaultData);
  await db.read();
  db.data ||= structuredClone(defaultData);
  dbInstance = db;
  return db;
}

function hash(pw) {
  return bcrypt.hashSync(pw, 10);
}

// Roda toda vez que o servidor sobe. Atualiza título/nível/conteúdo do curso
// a partir de course-data.js, mas NUNCA apaga escola, usuário, turma ou progresso.
async function syncCourseCatalog() {
  const db = await getDb();
  db.data.course = COURSE; // conteúdo pedagógico é sempre a fonte do código
  await db.write();
  return db.data.course;
}

async function seedIfEmpty() {
  const db = await getDb();
  let changed = false;

  if (!db.data.owner) {
    db.data.owner = {
      username: 'owner.master',
      passwordHash: hash(process.env.OWNER_PASSWORD || 'trocar-esta-senha-2026'),
    };
    changed = true;
  }

  if (db.data.escolas.length === 0) {
    db.data.escolas.push(
      {
        id: nanoid(),
        slug: 'colegio-atlas',
        nome: 'Colégio Atlas',
        usuarios: [
          { id: nanoid(), username: 'professor.demo', role: 'professor', passwordHash: hash('demo1234') },
          { id: nanoid(), username: 'admin', role: 'admin', passwordHash: hash('demo1234') },
        ],
        turmas: [],
      },
      {
        id: nanoid(),
        slug: 'instituto-nova-era',
        nome: 'Instituto Nova Era',
        usuarios: [
          { id: nanoid(), username: 'professor.demo', role: 'professor', passwordHash: hash('demo1234') },
        ],
        turmas: [],
      }
    );
    changed = true;
  }

  if (changed) await db.write();
}

module.exports = { getDb, syncCourseCatalog, seedIfEmpty, hash };
