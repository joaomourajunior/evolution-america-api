const express = require('express');
const { getDb, hash, nextId } = require('../db');
const { requireSchoolAuth } = require('../lib/auth-middleware');

const router = express.Router();
router.use(requireSchoolAuth);

function slugify(name) {
  return name
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// GET /api/schools — todas as escolas cadastradas na plataforma
router.get('/', async (req, res) => {
  const db = req.db;
  const schools = db.data.schools.map((s) => ({
    name: s.name, city: s.city, state: s.state, total_users: s.users.length,
  }));
  res.json({ schools });
});

// POST /api/schools { schoolName, city, state, adminName, adminUsername, adminPassword }
router.post('/', async (req, res) => {
  const db = req.db;
  const { schoolName, city, state, adminName, adminUsername, adminPassword } = req.body || {};
  if (!schoolName || !adminName || !adminUsername || !adminPassword) {
    return res.status(400).json({ error: 'Preencha nome da escola, nome do admin, usuário e senha' });
  }
  let slug = slugify(schoolName);
  let suffix = 1;
  while (db.data.schools.some((s) => s.slug === slug)) {
    slug = slugify(schoolName) + '-' + (++suffix);
  }

  const school = {
    id: (db.data.schools.reduce((max, s) => Math.max(max, s.id), 0) || 0) + 1,
    slug,
    name: schoolName,
    city: city || '',
    state: state || '',
    users: [{ id: 1, username: adminUsername, name: adminName, role: 'admin', passwordHash: hash(adminPassword) }],
    classes: [],
  };
  db.data.schools.push(school);
  await db.write();
  res.status(201).json({ school: { slug: school.slug, name: school.name, city: school.city, state: school.state } });
});

module.exports = router;
