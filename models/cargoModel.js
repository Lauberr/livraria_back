const db = require('../config/database');

module.exports = {
  listar: async () => {
    const { rows } = await db.query('SELECT * FROM cargo ORDER BY id_cargo');
    return rows;
  },

  obterPorId: async (id) => {
    const { rows } = await db.query('SELECT * FROM cargo WHERE id_cargo = $1', [id]);
    return rows[0];
  },

  criar: async (descricao, qt_livro) => {
    const { rows } = await db.query(
      'INSERT INTO cargo (descricao, qt_livro) VALUES ($1, $2) RETURNING *',
      [descricao, qt_livro]
    );
    return rows[0];
  },

  atualizar: async (id, descricao, qt_livro) => {
    const { rows } = await db.query(
      'UPDATE cargo SET descricao = $1, qt_livro = $2 WHERE id_cargo = $3 RETURNING *',
      [descricao, qt_livro, id]
    );
    return rows[0];
  },

  deletar: async (id) => {
    await db.query('DELETE FROM cargo WHERE id_cargo = $1', [id]);
  }
};
