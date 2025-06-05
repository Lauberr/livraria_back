const express = require('express');
const cors = require('cors');
require('dotenv').config();

const db = require('./config/database');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Permitir requisições de outros domínios (ex: frontend)
app.use(express.json()); // Entender JSON no corpo da requisição

// Rota de teste
app.get('/api/test', async (req, res) => {
  try {
    const result = await db.query('SELECT NOW()');
    res.json({ server: 'ok', db_time: result.rows[0].now });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao conectar ao banco', detail: err.message });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

