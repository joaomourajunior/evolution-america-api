const { getDb } = require('../db');
const token = require('../lib/token');

// Middleware: exige um token válido de usuário de escola (Authorization: Bearer <token>)
// e anexa req.school / req.user com os dados carregados do banco.
async function requireSchoolAuth(req, res, next) {
  const auth = req.header('authorization') || '';
  const t = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  const payload = token.verify(t);
  if (!payload) return res.status(401).json({ error: 'Não autenticado' });

  const db = await getDb();
  const school = db.data.schools.find((s) => s.id === payload.schoolId);
  const user = school && school.users.find((u) => u.id === payload.userId);
  if (!school || !user) return res.status(401).json({ error: 'Sessão inválida' });

  req.db = db;
  req.school = school;
  req.user = user;
  next();
}

module.exports = { requireSchoolAuth };
