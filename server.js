require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { init } = require('./db');

async function main() {
  await init(); // garante o banco carregado (e semeado, se vazio) antes de subir as rotas

  const authRoutes = require('./routes/auth');
  const schoolRoutes = require('./routes/schools');
  const courseRoutes = require('./routes/courses');
  const progressRoutes = require('./routes/progress');
  const evoiaRoutes = require('./routes/evoia');

  const app = express();
  const PORT = process.env.PORT || 3001;

  app.use(cors());
  app.use(express.json({ limit: '1mb' }));

  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', service: 'evolution-america-api', time: new Date().toISOString() });
  });

  app.use('/api/auth', authRoutes);
  app.use('/api/schools', schoolRoutes);
  app.use('/api/courses', courseRoutes);
  app.use('/api/progress', progressRoutes);
  app.use('/api/evoia', evoiaRoutes);

  // handler de erro genérico — evita que o servidor derrube a resposta sem explicação
  app.use((err, req, res, next) => {
    console.error('[erro não tratado]', err);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  });

  app.listen(PORT, () => {
    console.log(`\n🚀 Evolution América API rodando em http://localhost:${PORT}`);
    console.log(`   Health check: http://localhost:${PORT}/api/health\n`);
  });
}

main().catch(err => {
  console.error('Falha ao iniciar o servidor:', err);
  process.exit(1);
});
