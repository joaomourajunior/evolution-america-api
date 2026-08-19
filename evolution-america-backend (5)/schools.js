const express = require('express');
const { requireSchoolAuth, requireSchoolAdmin } = require('./auth-middleware');

const router = express.Router();
router.use(requireSchoolAuth);

// GET /api/schools/me — dados da própria escola (marca, contato, status)
router.get('/me', async (req, res) => {
  const s = req.school;
  res.json({
    school: {
      id: s.id, slug: s.slug, name: s.name, city: s.city, state: s.state,
      active: s.active !== false,
      logoDataUrl: s.logoDataUrl || null,
      email: s.email || '', phone: s.phone || '', cpfCnpj: s.cpfCnpj || '',
      courseCover: s.courseCover || null,
    },
  });
});

// PUT /api/schools/branding { logoDataUrl, email, phone, cpfCnpj, name, city, state }
// Autoatendimento da própria escola — restrito à direção (admin) da escola.
// O nome da escola também pode ser editado por aqui (ex: trocar o nome de
// demonstração pelo nome real da instituição). Nota importante: cadastrar ou
// excluir uma ESCOLA NOVA (não editar a que já existe) é ação exclusiva do
// Painel Evolution — ver routes/owner.js. Uma escola nunca cria outra escola.
router.put('/branding', requireSchoolAdmin, async (req, res) => {
  const db = req.db;
  const { logoDataUrl, email, phone, cpfCnpj, name, city, state } = req.body || {};
  if (typeof logoDataUrl === 'string') {
    if (logoDataUrl.length > 700000) {
      return res.status(413).json({ error: 'Imagem muito grande. Use um arquivo menor (até ~500KB).' });
    }
    req.school.logoDataUrl = logoDataUrl || null;
  }
  if (typeof email === 'string') req.school.email = email.trim();
  if (typeof phone === 'string') req.school.phone = phone.trim();
  if (typeof cpfCnpj === 'string') req.school.cpfCnpj = cpfCnpj.trim();
  if (typeof name === 'string' && name.trim()) req.school.name = name.trim();
  if (typeof city === 'string') req.school.city = city.trim();
  if (typeof state === 'string') req.school.state = state.trim();
  await db.write();
  res.json({
    school: {
      name: req.school.name, city: req.school.city, state: req.school.state,
      logoDataUrl: req.school.logoDataUrl || null,
      email: req.school.email || '', phone: req.school.phone || '', cpfCnpj: req.school.cpfCnpj || '',
    },
  });
});

// PUT /api/schools/course-cover { title, desc, tag, color, imageDataUrl }
// Personaliza como a trilha aparece no HUB Tecnológico dessa escola — fica
// salvo de verdade no servidor (antes só mudava na tela e sumia ao recarregar).
router.put('/course-cover', requireSchoolAdmin, async (req, res) => {
  const db = req.db;
  const { title, desc, tag, color, imageDataUrl } = req.body || {};
  if (imageDataUrl && imageDataUrl.length > 900000) {
    return res.status(413).json({ error: 'Imagem muito grande. Use um arquivo menor (até ~600KB).' });
  }
  req.school.courseCover = {
    title: typeof title === 'string' ? title.trim() : (req.school.courseCover && req.school.courseCover.title) || '',
    desc: typeof desc === 'string' ? desc.trim() : (req.school.courseCover && req.school.courseCover.desc) || '',
    tag: typeof tag === 'string' ? tag.trim() : (req.school.courseCover && req.school.courseCover.tag) || '',
    color: typeof color === 'string' ? color : (req.school.courseCover && req.school.courseCover.color) || '#D4AF37',
    imageDataUrl: typeof imageDataUrl === 'string' ? (imageDataUrl || null) : (req.school.courseCover && req.school.courseCover.imageDataUrl) || null,
  };
  await db.write();
  res.json({ courseCover: req.school.courseCover });
});

// GET /api/schools/users — lista os usuários da própria escola, com permissões
router.get('/users', requireSchoolAdmin, async (req, res) => {
  const users = req.school.users.map((u) => ({
    id: u.id, username: u.username, name: u.name, role: u.role,
    permissions: u.role === 'admin' ? { turmas: true, relatorios: true, evoia: true } : (u.permissions || { turmas: true, relatorios: true, evoia: true }),
  }));
  res.json({ users });
});

// PUT /api/schools/users/:userId/permissions { permissions: { turmas, relatorios, evoia } }
// A diretora decide, aos poucos, o que cada funcionário da própria escola pode ver.
// Nunca afeta outra escola — a rota só enxerga req.school (a escola de quem está logado).
router.put('/users/:userId/permissions', requireSchoolAdmin, async (req, res) => {
  const db = req.db;
  const user = req.school.users.find((u) => u.id === Number(req.params.userId));
  if (!user) return res.status(404).json({ error: 'Usuário não encontrado nesta escola' });
  if (user.role === 'admin') {
    return res.status(400).json({ error: 'A direção da escola sempre tem acesso completo' });
  }
  const { permissions } = req.body || {};
  if (!permissions || typeof permissions !== 'object') {
    return res.status(400).json({ error: 'permissions é obrigatório' });
  }
  user.permissions = {
    turmas: !!permissions.turmas,
    relatorios: !!permissions.relatorios,
    evoia: !!permissions.evoia,
  };
  await db.write();
  res.json({ user: { id: user.id, username: user.username, permissions: user.permissions } });
});

module.exports = router;
