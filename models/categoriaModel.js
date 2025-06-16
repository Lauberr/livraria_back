const db = require('../config/database');

const Categoria = {
  listar: async () => {
    const result = await db.query('SELECT * FROM categoria');
    return result.rows;
  },

  obterPorId: async (id) => {
    const result = await db.query('SELECT * FROM categoria WHERE id_categoria = $1', [id]);
    return result.rows[0];
  },

  criar: async (nome_categoria) => {
    const result = await db.query(
      'INSERT INTO categoria (nome_categoria) VALUES ($1) RETURNING *',
      [nome_categoria]
    );
    return result.rows[0];
  },

  atualizar: async (id, nome_categoria) => {
    const result = await db.query(
      'UPDATE categoria SET nome_categoria = $1 WHERE id_categoria = $2 RETURNING *',
      [nome_categoria, id]
    );
    return result.rows[0];
  },

  deletar: async (id) => {
    await db.query('DELETE FROM categoria WHERE id_categoria = $1', [id]);
  }
};

module.exports = Categoria;
