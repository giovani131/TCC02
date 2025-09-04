require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./config/db'); 
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(cors());
app.use(express.json());


pool.connect()
  .then(client => {
    console.log('✅ Conectado ao PostgreSQL');
    client.release(); 
  })
  .catch(err => {
    console.error('❌ Erro ao conectar ao PostgreSQL:', err.message);
    process.exit(1);
  });

// Rotas
app.use('/api', userRoutes);

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta http://localhost:${PORT}/`);
});
