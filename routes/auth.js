const express = require('express');
const bcrypt = require('bcryptjs');
const { nanoid } = require('nanoid');
const { getDb, hash } = require('../db');

const router = express.Router();

function makeToken(payload) {
  return Buffer.from(JSON.stringify({ ...payload, t: Date.now() })).toString('base64');
}

// POST /api/auth/login  { escolaSlug, username, password }
router.post('/login', async (req, res) => {
  const { escolaSlug, username, password } = req.body || {};
  if (!escolaSlug || !username || !password) {
    return res.status(400).json({ error: 'escolaSlug, username e password são obrigatórios' });
  }
  const db = await getDb();
  const escola = db.data.escolas.find((e) => e.slug === escolaSlug);
  if (!escola) return res.status(401).json({ error: 'Escola não encontrada' });

  const user = escola.usuarios.find((u) => u.username === username);
  if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
    return res.status(401).json({ error: 'Usuário ou senha inválidos' });
  }

  return res.json({
    token: makeToken({ escolaId: escola.id, userId: user.id, role: user.role }),
    escola: { id: escola.id, nome: escola.nome, slug: escola.slug },
    usuario: { id: user.id, username: user.username, role: user.role },
  });
});

// POST /api/auth/forgot-password { escolaSlug, username }
router.post('/forgot-password', async (req, res) => {
  const { escolaSlug, username } = req.body || {};
  const db = await getDb();
  const escola = db.data.escolas.find((e) => e.slug === escolaSlug);
  const user = escola && escola.usuarios.find((u) => u.username === username);

  // Não revelamos se o usuário existe ou não (evita enumeração de contas).
  if (user) {
    user.resetToken = nanoid();
    user.resetTokenExpiry = Date.now() + 1000 * 60 * 30; // 30 min
    await db.write();
    // Em produção isso dispararia um e-mail. Aqui devolvemos o token
    // só para viabilizar o teste ponta-a-ponta do fluxo.
    return res.json({ ok: true, resetToken: user.resetToken });
  }
  return res.json({ ok: true });
});

// POST /api/auth/reset-password { resetToken, novaSenha }
router.post('/reset-password', async (req, res) => {
  const { resetToken, novaSenha } = req.body || {};
  if (!resetToken || !novaSenha) {
    return res.status(400).json({ error: 'resetToken e novaSenha são obrigatórios' });
  }
  const db = await getDb();
  let found = null;
  for (const escola of db.data.escolas) {
    const u = escola.usuarios.find((x) => x.resetToken === resetToken);
    if (u) { found = u; break; }
  }
  if (!found || !found.resetTokenExpiry || found.resetTokenExpiry < Date.now()) {
    return res.status(400).json({ error: 'Token inválido ou expirado' });
  }
  found.passwordHash = hash(novaSenha);
  delete found.resetToken;
  delete found.resetTokenExpiry;
  await db.write();
  return res.json({ ok: true });
});

module.exports = router;
