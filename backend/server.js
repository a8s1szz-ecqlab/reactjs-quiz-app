const app = require('./src/app');

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 ReactJS Quiz Backend server is running on port ${PORT}`);
  console.log(`📊 API endpoints available at http://localhost:${PORT}/api`);
  console.log(`💚 Health check: http://localhost:${PORT}/api/health`);
  console.log('');
  console.log('Available endpoints:');
  console.log(`  GET  /api/quiz/start  - Start a new quiz`);
  console.log(`  POST /api/quiz/submit - Submit quiz answers`);
  console.log(`  GET  /api/quiz/stats  - Get quiz statistics`);
  console.log(`  GET  /api/health      - Health check`);
});
