const express = require('express');
const { requireSchoolAuth, requirePermission } = require('../lib/auth-middleware');
const { answerFromFAQ } = require('../evoia-knowledge');

const router = express.Router();
router.use(requireSchoolAuth);
router.use(requirePermission('evoia'));

// POST /api/evoia/chat { message }
router.post('/chat', async (req, res) => {
  const message = (req.body && req.body.message) || '';
  const reply = answerFromFAQ(message);
  res.json({ reply, source: 'local' });
});

module.exports = router;
