const db = require('../config/database');

const subcategoria = {
  listar: async () => {
    const result = await db.query('SELECT * FROM subcategoria');
    return result.rows;
  },

  obterPorId: async (id) => {
    const result = await db.query('SELECT * FROM subcategoria WHERE id_subcat = $1', [id]);
    return result.rows[0];
  },

  criar: async (nome_subcat) => {
    const result = await db.query(
      'INSERT INTO subcategoria (nome_subcat) VALUES ($1) RETURNING *',
      [nome_subcat]
    );
    return result.rows[0];
  },

  atualizar: async (id, nome_subcat) => {
    const result = await db.query(
      'UPDATE subcategoria SET nome_subcat = $1 WHERE id_subcat = $2 RETURNING *',
      [nome_subcat, id]
    );
    return result.rows[0];
  },

  deletar: async (id) => {
    await db.query('DELETE FROM subcategoria WHERE id_subcat = $1', [id]);
  }
};

module.exports = subcategoria;
