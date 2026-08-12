const express = require('express');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { helpers } = require('../db');
const { signToken, requireAuth } = require('../middleware/auth');

const router = express.Router();

// GET /api/auth/schools — lista de escolas ativas, para popular o seletor no login
router.get('/schools', (req, res) => {
  const schools = helpers.listActiveSchools().map(s => ({ id: s.id, name: s.name, slug: s.slug, city: s.city, state: s.state }));
  res.json({ schools });
});

// POST /api/auth/login  { schoolSlug, username, password }
router.post('/login', (req, res) => {
  const { schoolSlug, username, password } = req.body || {};
  if (!schoolSlug || !username || !password) {
    return res.status(400).json({ error: 'Escola, usuário e senha são obrigatórios.' });
  }

  const school = helpers.getSchoolBySlug(schoolSlug);
  if (!school) return res.status(401).json({ error: 'Escola não encontrada.' });

  const user = helpers.getUserByCredentials(school.id, username);
  if (!user) return res.status(401).json({ error: 'Usuário ou senha inválidos.' });

  const ok = bcrypt.compareSync(password, user.password_hash);
  if (!ok) return res.status(401).json({ error: 'Usuário ou senha inválidos.' });

  const token = signToken(user);
  res.json({
    token,
    user: { id: user.id, name: user.name, username: user.username, role: user.role },
    school: { id: school.id, name: school.name, slug: school.slug },
  });
});

// GET /api/auth/me — retorna quem está logado, a partir do token
router.get('/me', requireAuth, (req, res) => {
  const user = helpers.getUserById(req.user.userId);
  if (!user) return res.status(404).json({ error: 'Usuário não encontrado.' });
  const school = helpers.getSchoolById(user.school_id);
  res.json({
    user: { id: user.id, name: user.name, username: user.username, email: user.email, role: user.role, school_id: user.school_id },
    school: { id: school.id, name: school.name, slug: school.slug },
  });
});

// POST /api/auth/forgot-password  { schoolSlug, email }
router.post('/forgot-password', async (req, res) => {
  const { schoolSlug, email } = req.body || {};
  if (!schoolSlug || !email) {
    return res.status(400).json({ error: 'Escola e e-mail são obrigatórios.' });
  }

  const school = helpers.getSchoolBySlug(schoolSlug);
  const user = school ? helpers.getUserByEmail(school.id, email) : null;

  if (user) {
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000).toISOString(); // 1h
    await helpers.createPasswordReset({ user_id: user.id, token, expires_at: expiresAt });

    // TODO produção: enviar e-mail de verdade (ex: Resend, SendGrid, SES).
    console.log(`[forgot-password] Link de redefinição para ${email}: /reset-password?token=${token}`);
  }

  res.json({ message: 'Se este e-mail estiver cadastrado, um link de redefinição foi enviado.' });
});

// POST /api/auth/reset-password  { token, newPassword }
router.post('/reset-password', async (req, res) => {
  const { token, newPassword } = req.body || {};
  if (!token || !newPassword || newPassword.length < 6) {
    return res.status(400).json({ error: 'Token e nova senha (mínimo 6 caracteres) são obrigatórios.' });
  }

  const reset = helpers.getValidPasswordReset(token);
  if (!reset || new Date(reset.expires_at) < new Date()) {
    return res.status(400).json({ error: 'Link inválido ou expirado. Solicite um novo.' });
  }

  const passwordHash = bcrypt.hashSync(newPassword, 10);
  await helpers.updateUserPassword(reset.user_id, passwordHash);
  await helpers.markPasswordResetUsed(reset.id);

  res.json({ message: 'Senha redefinida com sucesso. Você já pode fazer login.' });
});

module.exports = router;
