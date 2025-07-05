const db = require('../config/database');

module.exports = {
  listar: async () => {
    const result = await db.query('SELECT * FROM livro');
    return result.rows;
  },

  obterPorId: async (id) => {
    const result = await db.query('SELECT * FROM livro WHERE id_livro = $1', [id]);
    return result.rows[0];
  },

  criar: async (dados) => {
    const { isbn, titulo, qt_disponivel, disponivel, edicao, capa } = dados;
    const result = await db.query(
      `INSERT INTO livro (isbn, titulo, qt_disponivel, disponivel, edicao, capa)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [isbn, titulo, qt_disponivel, disponivel, edicao, capa]
    );
    return result.rows[0];
  },

  atualizar: async (id, dados) => {
    const { isbn, titulo, qt_disponivel, disponivel, edicao, capa } = dados;
    const result = await db.query(
      `UPDATE livro
       SET isbn = $1, titulo = $2, qt_disponivel = $3, disponivel = $4, edicao = $5, capa = $6
       WHERE id_livro = $7 RETURNING *`,
      [isbn, titulo, qt_disponivel, disponivel, edicao, capa, id]
    );
    return result.rows[0];
  },

  deletar: async (id) => {
    await db.query('DELETE FROM livro WHERE id_livro = $1', [id]);
  }
};
