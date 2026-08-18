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

// Middleware adicional: exige que o usuário logado seja "admin" (diretora)
// da própria escola. Use depois de requireSchoolAuth.
function requireSchoolAdmin(req, res, next) {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Só a direção da escola pode fazer isso' });
  }
  next();
}

// Middleware factory: exige uma permissão específica (turmas/relatorios/evoia).
// A direção (role "admin") sempre passa, independente do que estiver salvo —
// só vale de fato pra restringir outros papéis, aos poucos, pela diretora.
function requirePermission(key) {
  return function (req, res, next) {
    if (req.user.role === 'admin') return next();
    const perms = req.user.permissions || {};
    if (!perms[key]) {
      return res.status(403).json({ error: 'Seu acesso a esta área foi restringido pela direção da escola' });
    }
    next();
  };
}

module.exports = { requireSchoolAuth, requireSchoolAdmin, requirePermission };
