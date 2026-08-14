const express = require('express');
const cors = require('cors');
const { seedIfEmpty } = require('./db');

const authRoutes = require('./routes/auth');
const classesRoutes = require('./routes/classes');
const schoolsRoutes = require('./routes/schools');
const reportsRoutes = require('./routes/reports');
const coursesRoutes = require('./routes/courses');
const progressRoutes = require('./routes/progress');
const evoiaRoutes = require('./routes/evoia');
const { router: ownerRoutes } = require('./routes/owner');
const suggestionsRoutes = require('./routes/suggestions');
const studentsRoutes = require('./routes/students');

function createApp() {
  const app = express();
  app.use(cors());
  app.use(express.json({ limit: '2mb' })); // limite maior por causa do upload de logo em base64

  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  app.use('/api/auth', authRoutes);
  app.use('/api/classes', classesRoutes);
  app.use('/api/schools', schoolsRoutes);
  app.use('/api/reports', reportsRoutes);
  app.use('/api/courses', coursesRoutes);
  app.use('/api/progress', progressRoutes);
  app.use('/api/evoia', evoiaRoutes);
  app.use('/api/owner', ownerRoutes);
  app.use('/api/suggestions', suggestionsRoutes);
  app.use('/api/students', studentsRoutes);

  return app;
}

async function boot() {
  await seedIfEmpty();
  const app = createApp();
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => console.log(`Evolution América API rodando na porta ${PORT}`));
}

if (require.main === module) {
  boot();
}

module.exports = { createApp, boot };
