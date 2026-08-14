const { getDb } = require('../db');
const token = require('./token');

// Middleware: exige um token válido de ESTUDANTE (separado do token de escola/dono).
// Anexa req.school / req.klass / req.student com os dados carregados do banco.
async function requireStudentAuth(req, res, next) {
  const auth = req.header('authorization') || '';
  const t = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  const payload = token.verify(t);
  if (!payload || !payload.student) return res.status(401).json({ error: 'Não autenticado' });

  const db = await getDb();
  const school = db.data.schools.find((s) => s.id === payload.schoolId);
  if (!school) return res.status(401).json({ error: 'Sessão inválida' });
  let klass = null, student = null;
  for (const c of school.classes) {
    const s = c.students.find((st) => st.id === payload.studentId);
    if (s) { klass = c; student = s; break; }
  }
  if (!student) return res.status(401).json({ error: 'Sessão inválida' });
  if (school.active === false) return res.status(403).json({ error: 'O acesso desta escola está suspenso.' });

  req.db = db;
  req.school = school;
  req.klass = klass;
  req.student = student;
  next();
}

module.exports = { requireStudentAuth };
