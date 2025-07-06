const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  connectionString: process.env.CONNECTION_STRING
});

pool.on('connect', async () => {
  console.log('Base de Dados conectado com sucesso!');
  try {
    await pool.query("SET TIME ZONE 'America/Sao_Paulo'");
    console.log("Fuso horário configurado para America/Sao_Paulo");
  } catch (err) {
    console.error("Erro ao configurar o fuso horário:", err.message);
  }
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
