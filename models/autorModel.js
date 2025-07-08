const db = require('../config/database');

const Autor = {
  listar: async () => {
    const result = await db.query('SELECT * FROM autores');
    return result.rows;
  },
  obterPorId: async (id) => {
    const result = await db.query('SELECT * FROM autores WHERE id_autor = $1', [id]);
    return result.rows[0];
  },
  criar: async (nome_autor) => {
    const result = await db.query(
      'INSERT INTO autores (nome_autor) VALUES ($1) RETURNING *',
      [nome_autor]
    );
    return result.rows[0];
  },
  atualizar: async (id, nome_autor) => {
    const result = await db.query(
      'UPDATE autores SET nome_autor = $1 WHERE id_autor = $2 RETURNING *',
      [nome_autor, id]
    );
    return result.rows[0];
  },
  deletar: async (id) => {
    await db.query('DELETE FROM autores WHERE id_autor = $1', [id]);
  }
};

module.exports = Autor;
