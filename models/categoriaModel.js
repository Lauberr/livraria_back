const db = require('../config/database');

const Categoria = {
  listar: async () => {
    const result = await db.query('SELECT * FROM categoria');
    return result.rows;
  },

  obterPorId: async (id) => {
    const result = await db.query('SELECT * FROM categoria WHERE id_cat = $1', [id]);
    return result.rows[0];
  },

  criar: async (nome_cat) => {
    const result = await db.query(
      'INSERT INTO categoria (nome_cat) VALUES ($1) RETURNING *',
      [nome_cat]
    );
    return result.rows[0];
  },

  atualizar: async (id, nome_cat) => {
    const result = await db.query(
      'UPDATE categoria SET nome_cat = $1 WHERE id_cat = $2 RETURNING *',
      [nome_cat, id]
    );
    return result.rows[0];
  },

  deletar: async (id) => {
    await db.query('DELETE FROM categoria WHERE id_cat = $1', [id]);
  }
};

module.exports = Categoria;
