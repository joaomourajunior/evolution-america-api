const express = require('express');
const { helpers } = require('../db');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

// GET /api/reports/school — relatório agregado da escola do usuário logado
// (isolado por tenant: cada escola só vê o próprio relatório)
router.get('/school', requireAuth, (req, res) => {
  const report = helpers.getSchoolReport(req.user.schoolId);
  res.json(report);
});

module.exports = router;
