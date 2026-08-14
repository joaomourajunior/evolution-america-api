// db.js — banco de dados 100% JavaScript puro (lowdb), sem dependências nativas.
// Lição aprendida: better-sqlite3 causava Segmentation fault no Railway.
// Nota técnica: lowdb 7.x é ESM-only (só funciona com "import", não com "require").
// Por isso carregamos ele com import() dinâmico dentro de uma função async,
// mantendo o resto do projeto 100% CommonJS (require).
const path = require('path');
const bcrypt = require('bcryptjs');

const DB_FILE = path.join(__dirname, 'evolution-america.json');

const defaultData = {
  schools: [],        // { id, slug, name, city, state, users:[{id,username,passwordHash,name,role}], classes:[{id,name,students:[{id,name,username,passwordHash}]}] }
  owner: null,         // { username, passwordHash }
  suggestions: [],     // { id, schoolId, schoolName, author, message, createdAt }
  ownerVisitLog: [],   // { id, quando, acao, escolaId, escolaNome, detalhe }
  counters: { classId: 0, studentId: 0 },
};

let dbInstance = null;

async function getDb() {
  if (dbInstance) return dbInstance;
  const { Low } = await import('lowdb');
  const { JSONFile } = await import('lowdb/node');
  const adapter = new JSONFile(DB_FILE);
  const db = new Low(adapter, defaultData);
  await db.read();
  db.data ||= structuredClone(defaultData);
  db.data.counters ||= { classId: 0, studentId: 0 };
  dbInstance = db;
  return db;
}

function hash(pw) {
  return bcrypt.hashSync(pw, 10);
}

function nextId(db, key) {
  db.data.counters[key] = (db.data.counters[key] || 0) + 1;
  return db.data.counters[key];
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

  if (db.data.schools.length === 0) {
    db.data.schools.push(
      {
        id: 1,
        slug: 'colegio-atlas',
        name: 'Colégio Atlas',
        city: 'Sorocaba',
        state: 'SP',
        users: [
          { id: 1, username: 'professor.demo', name: 'Professor Demo', role: 'professor', passwordHash: hash('demo1234') },
          { id: 2, username: 'admin', name: 'Administrador', role: 'admin', passwordHash: hash('demo1234') },
        ],
        classes: [],
      },
      {
        id: 2,
        slug: 'instituto-nova-era',
        name: 'Instituto Nova Era',
        city: 'Curitiba',
        state: 'PR',
        users: [
          { id: 1, username: 'professor.demo', name: 'Professor Demo', role: 'professor', passwordHash: hash('demo1234') },
        ],
        classes: [],
      }
    );
    changed = true;
  }

  if (changed) await db.write();
}

module.exports = { getDb, seedIfEmpty, hash, nextId };
