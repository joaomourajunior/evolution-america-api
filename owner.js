const express = require('express');
const bcrypt = require('bcryptjs');
const { getDb, hash } = require('./db');
const tokenLib = require('./token');

const router = express.Router();

async function requireOwner(req, res, next) {
  const auth = req.header('authorization') || req.header('x-owner-token') || '';
  const t = auth.startsWith('Bearer ') ? auth.slice(7) : auth;
  const db = await getDb();
  const payload = tokenLib.verify(t);
  if (!payload || !payload.owner || !db.data.owner) {
    return res.status(401).json({ error: 'Acesso restrito ao dono da plataforma' });
  }
  req.db = db;
  next();
}

async function logVisit(db, { acao, escolaId, escolaNome, detalhe }) {
  db.data.ownerVisitLog.push({
    id: db.data.ownerVisitLog.length + 1,
    quando: new Date().toISOString(),
    acao,
    escolaId: escolaId || null,
    escolaNome: escolaNome || null,
    detalhe: detalhe || null,
  });
  await db.write();
}

// POST /api/owner/login { username, password } — sem campo "escola"
router.post('/login', async (req, res) => {
  const { username, password } = req.body || {};
  const db = await getDb();
  const owner = db.data.owner;
  if (!owner || owner.username !== username || !bcrypt.compareSync(password || '', owner.passwordHash)) {
    return res.status(401).json({ error: 'Usuário ou senha inválidos' });
  }
  const t = tokenLib.sign({ owner: true, username });
  await logVisit(db, { acao: 'login', detalhe: 'Login do dono na plataforma' });
  res.json({ token: t, user: { username: owner.username, role: 'owner' } });
});

// GET /api/owner/schools — lista todas as escolas (a escola nunca é notificada)
router.get('/schools', requireOwner, async (req, res) => {
  const db = req.db;
  const schools = db.data.schools.map((s) => ({
    id: s.id, slug: s.slug, name: s.name, city: s.city, state: s.state,
    active: s.active !== false,
    totalUsers: s.users.length,
    totalClasses: s.classes.length,
    totalStudents: s.classes.reduce((a, c) => a + c.students.length, 0),
  }));
  await logVisit(db, { acao: 'listar_escolas', detalhe: `${schools.length} escolas listadas` });
  res.json({ schools });
});

// GET /api/owner/schools/:id — detalhe (gera entrada no log privado)
router.get('/schools/:id', requireOwner, async (req, res) => {
  const db = req.db;
  const school = db.data.schools.find((s) => s.id === Number(req.params.id));
  if (!school) return res.status(404).json({ error: 'Escola não encontrada' });

  await logVisit(db, {
    acao: 'ver_detalhe_escola', escolaId: school.id, escolaNome: school.name,
    detalhe: 'Dono acessou detalhe da escola',
  });

  res.json({
    school: {
      id: school.id, slug: school.slug, name: school.name, city: school.city, state: school.state,
      active: school.active !== false,
      logoDataUrl: school.logoDataUrl || null,
      email: school.email || '', phone: school.phone || '', cpfCnpj: school.cpfCnpj || '',
      users: school.users.map((u) => ({ id: u.id, username: u.username, name: u.name, role: u.role, email: u.email || '', phone: u.phone || '' })),
      classes: school.classes.map((c) => ({
        id: c.id, name: c.name,
        students: c.students.map((s) => ({ id: s.id, name: s.name, username: s.username })),
      })),
    },
  });
});

// GET /api/owner/visit-log — log privado, visível SÓ pro dono
router.get('/visit-log', requireOwner, async (req, res) => {
  res.json({ log: [...req.db.data.ownerVisitLog].reverse() });
});

// GET /api/owner/suggestions
router.get('/suggestions', requireOwner, async (req, res) => {
  res.json({ suggestions: [...req.db.data.suggestions].reverse() });
});

// PUT /api/owner/schools/:id/users/:userId { username?, password?, name? }
// Só o dono pode trocar o LOGIN de um usuário de escola. Senha também pode
// ser trocada por aqui (útil se a escola perder acesso total).
router.put('/schools/:id/users/:userId', requireOwner, async (req, res) => {
  const db = req.db;
  const school = db.data.schools.find((s) => s.id === Number(req.params.id));
  if (!school) return res.status(404).json({ error: 'Escola não encontrada' });
  const user = school.users.find((u) => u.id === Number(req.params.userId));
  if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

  const { username, password, name } = req.body || {};
  if (username && username.trim() && username.trim() !== user.username) {
    const emUso = school.users.some((u) => u.id !== user.id && u.username === username.trim());
    if (emUso) return res.status(409).json({ error: 'Já existe outro usuário com esse login nesta escola' });
    user.username = username.trim();
  }
  if (password) {
    if (password.length < 6) return res.status(400).json({ error: 'A nova senha deve ter pelo menos 6 caracteres' });
    user.passwordHash = hash(password);
  }
  if (name && name.trim()) user.name = name.trim();

  await db.write();
  await logVisit(db, {
    acao: 'editar_login_senha_usuario', escolaId: school.id, escolaNome: school.name,
    detalhe: `Login/senha do usuário "${user.username}" foi alterado pelo dono`,
  });
  res.json({ user: { id: user.id, username: user.username, name: user.name, role: user.role } });
});

// PUT /api/owner/schools/:id/status { active: true|false }
// Trava/destrava o acesso de uma escola inteira (ex: inadimplência).
router.put('/schools/:id/status', requireOwner, async (req, res) => {
  const db = req.db;
  const school = db.data.schools.find((s) => s.id === Number(req.params.id));
  if (!school) return res.status(404).json({ error: 'Escola não encontrada' });

  const { active } = req.body || {};
  school.active = !!active;
  await db.write();
  await logVisit(db, {
    acao: school.active ? 'reativar_escola' : 'suspender_escola',
    escolaId: school.id, escolaNome: school.name,
    detalhe: school.active ? 'Acesso da escola reativado pelo dono' : 'Acesso da escola suspenso pelo dono',
  });
  res.json({ school: { id: school.id, active: school.active } });
});

// PUT /api/owner/change-password { currentPassword, newPassword }
router.put('/change-password', requireOwner, async (req, res) => {
  const db = req.db;
  const { currentPassword, newPassword } = req.body || {};
  if (!newPassword || newPassword.length < 6) {
    return res.status(400).json({ error: 'A nova senha deve ter pelo menos 6 caracteres' });
  }
  if (!bcrypt.compareSync(currentPassword || '', db.data.owner.passwordHash)) {
    return res.status(401).json({ error: 'Senha atual incorreta' });
  }
  db.data.owner.passwordHash = hash(newPassword);
  await db.write();
  res.json({ ok: true });
});

// POST /api/owner/schools { schoolName, city, state, adminName, adminUsername, adminPassword }
// Cadastrar uma escola nova na plataforma é ação exclusiva do Painel Evolution —
// a autorização do dono É o próprio ato de criar por aqui.
router.post('/schools', requireOwner, async (req, res) => {
  const db = req.db;
  const { schoolName, city, state, adminName, adminUsername, adminPassword } = req.body || {};
  if (!schoolName || !adminName || !adminUsername || !adminPassword) {
    return res.status(400).json({ error: 'Preencha nome da escola, nome do admin, usuário e senha' });
  }
  if (adminPassword.length < 6) {
    return res.status(400).json({ error: 'A senha do administrador deve ter pelo menos 6 caracteres' });
  }
  const slugify = (name) => name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  let slug = slugify(schoolName);
  let suffix = 1;
  while (db.data.schools.some((s) => s.slug === slug)) {
    slug = slugify(schoolName) + '-' + (++suffix);
  }

  const school = {
    id: (db.data.schools.reduce((max, s) => Math.max(max, s.id), 0) || 0) + 1,
    slug, name: schoolName, city: city || '', state: state || '',
    active: true, logoDataUrl: null, email: '', phone: '', cpfCnpj: '',
    users: [{
      id: 1, username: adminUsername, name: adminName, role: 'admin',
      passwordHash: hash(adminPassword), email: '', phone: '', cpf: '',
      permissions: { turmas: true, relatorios: true, evoia: true },
    }],
    classes: [],
  };
  db.data.schools.push(school);
  await db.write();
  await logVisit(db, { acao: 'criar_escola', escolaId: school.id, escolaNome: school.name, detalhe: 'Escola cadastrada pelo dono' });
  res.status(201).json({ school: { id: school.id, slug: school.slug, name: school.name } });
});

// DELETE /api/owner/schools/:id — exclusão de escola é sempre ação exclusiva do dono.
router.delete('/schools/:id', requireOwner, async (req, res) => {
  const db = req.db;
  const school = db.data.schools.find((s) => s.id === Number(req.params.id));
  if (!school) return res.status(404).json({ error: 'Escola não encontrada' });
  db.data.schools = db.data.schools.filter((s) => s.id !== school.id);
  await db.write();
  await logVisit(db, { acao: 'excluir_escola', escolaId: school.id, escolaNome: school.name, detalhe: 'Escola excluída pelo dono' });
  res.json({ ok: true });
});

// GET /api/owner/search?q=termo — busca estudantes por nome em todas as escolas
// (ferramenta de suporte do dono; a escola já tem sua própria busca restrita à
// própria base, ver /api/reports/search).
router.get('/search', requireOwner, async (req, res) => {
  const db = req.db;
  const q = (req.query.q || '').toLowerCase().trim();
  if (!q) return res.json({ results: [] });
  const results = [];
  db.data.schools.forEach((school) => {
    school.classes.forEach((klass) => {
      klass.students.forEach((st) => {
        if (st.name.toLowerCase().includes(q) || st.username.toLowerCase().includes(q)) {
          results.push({
            studentId: st.id, name: st.name, username: st.username,
            schoolId: school.id, schoolName: school.name,
            className: klass.name, enrolledModule: st.enrolledModule || 'm1',
          });
        }
      });
    });
  });
  res.json({ results });
});

module.exports = { router, requireOwner };
