const express = require('express');
const cors = require('cors');
const { syncCourseCatalog, seedIfEmpty, getDb } = require('./db');
const authRoutes = require('./routes/auth');
const { router: ownerRoutes } = require('./routes/owner');
const suggestionsRoutes = require('./routes/suggestions');
const turmasRoutes = require('./routes/turmas');
const relatoriosRoutes = require('./routes/relatorios');
const evoiaRoutes = require('./routes/evoia');

function createApp() {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.get('/api/health', async (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  app.get('/api/course', async (req, res) => {
    const db = await getDb();
    res.json({ course: db.data.course });
  });

  app.use('/api/auth', authRoutes);
  app.use('/api/owner', ownerRoutes);
  app.use('/api/suggestions', suggestionsRoutes);
  app.use('/api/escolas', turmasRoutes);
  app.use('/api/escolas', relatoriosRoutes);
  app.use('/api/evoia', evoiaRoutes);

  return app;
}

async function boot() {
  await seedIfEmpty();
  await syncCourseCatalog(); // roda toda vez que o servidor sobe, sem apagar dados existentes
  const app = createApp();
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => console.log(`Evolution América API rodando na porta ${PORT}`));
}

if (require.main === module) {
  boot();
}

module.exports = { createApp, boot };
