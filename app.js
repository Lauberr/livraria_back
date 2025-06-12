const express = require('express');
const cors = require('cors');
require('dotenv').config();

const db = require('./config/database');
const autorRoutes = require('./routes/autorRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/autores', autorRoutes); // <- rota principal dos autores

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


