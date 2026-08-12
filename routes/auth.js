const express = require('express');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const db = require('../db');
const { signToken, requireAuth } = require('../middleware/auth');

const router = express.Router();

// GET /api/auth/schools — lista de escolas ativas, para popular o seletor no login
router.get('/schools', (req, res) => {
  const schools = db.prepare(`SELECT id, name, slug, city, state FROM schools WHERE active = 1 ORDER BY name`).all();
  res.json({ schools });
});

// POST /api/auth/login  { schoolSlug, username, password }
router.post('/login', (req, res) => {
  const { schoolSlug, username, password } = req.body || {};
  if (!schoolSlug || !username || !password) {
    return res.status(400).json({ error: 'Escola, usuário e senha são obrigatórios.' });
  }

  const school = db.prepare(`SELECT * FROM schools WHERE slug = ? AND active = 1`).get(schoolSlug);
  if (!school) return res.status(401).json({ error: 'Escola não encontrada.' });

  const user = db.prepare(`SELECT * FROM users WHERE school_id = ? AND username = ? AND active = 1`)
    .get(school.id, username);
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
  const user = db.prepare(`SELECT id, name, username, email, role, school_id FROM users WHERE id = ?`)
    .get(req.user.userId);
  if (!user) return res.status(404).json({ error: 'Usuário não encontrado.' });
  const school = db.prepare(`SELECT id, name, slug FROM schools WHERE id = ?`).get(user.school_id);
  res.json({ user, school });
});

// POST /api/auth/forgot-password  { schoolSlug, email }
// Por segurança, a resposta é sempre a mesma exista ou não o e-mail — evita
// que alguém descubra quais e-mails estão cadastrados testando a rota.
router.post('/forgot-password', (req, res) => {
  const { schoolSlug, email } = req.body || {};
  if (!schoolSlug || !email) {
    return res.status(400).json({ error: 'Escola e e-mail são obrigatórios.' });
  }

  const school = db.prepare(`SELECT * FROM schools WHERE slug = ?`).get(schoolSlug);
  const user = school
    ? db.prepare(`SELECT * FROM users WHERE school_id = ? AND email = ? AND active = 1`).get(school.id, email)
    : null;

  if (user) {
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000).toISOString(); // 1h
    db.prepare(`INSERT INTO password_resets (user_id, token, expires_at) VALUES (?, ?, ?)`)
      .run(user.id, token, expiresAt);

    // TODO produção: enviar e-mail de verdade (ex: Resend, SendGrid, SES).
    // Por enquanto, registramos no log do servidor para o time de dev testar o fluxo.
    console.log(`[forgot-password] Link de redefinição para ${email}: /reset-password?token=${token}`);
  }

  res.json({ message: 'Se este e-mail estiver cadastrado, um link de redefinição foi enviado.' });
});

// POST /api/auth/reset-password  { token, newPassword }
router.post('/reset-password', (req, res) => {
  const { token, newPassword } = req.body || {};
  if (!token || !newPassword || newPassword.length < 6) {
    return res.status(400).json({ error: 'Token e nova senha (mínimo 6 caracteres) são obrigatórios.' });
  }

  const reset = db.prepare(`SELECT * FROM password_resets WHERE token = ? AND used = 0`).get(token);
  if (!reset || new Date(reset.expires_at) < new Date()) {
    return res.status(400).json({ error: 'Link inválido ou expirado. Solicite um novo.' });
  }

  const passwordHash = bcrypt.hashSync(newPassword, 10);
  db.prepare(`UPDATE users SET password_hash = ? WHERE id = ?`).run(passwordHash, reset.user_id);
  db.prepare(`UPDATE password_resets SET used = 1 WHERE id = ?`).run(reset.id);

  res.json({ message: 'Senha redefinida com sucesso. Você já pode fazer login.' });
});

module.exports = router;
