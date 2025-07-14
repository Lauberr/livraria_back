const db = require('../config/database');

const LivroEditora = {
  async vincular(id_livro, id_editora) {
    const result = await db.query(
      `INSERT INTO editora_livro (id_livro, id_editora)
       VALUES ($1, $2) RETURNING *`,
      [id_livro, id_editora]
    );
    return result.rows[0];
  },

  async listar() {
    const result = await db.query(`
      SELECT le.*, l.titulo, e.nome_editora
      FROM editora_livro el
      JOIN livro l ON l.id_livro = el.id_livro
      JOIN editora e ON e.id_editora = el.id_editora
    `);
    return result.rows;
  },

  async buscarPorLivro(id_livro) {
    const result = await db.query(
      `SELECT e.*
       FROM editora_livro el
       JOIN editora e ON el.id_editora = e.id_editora
       WHERE el.id_livro = $1`,
      [id_livro]
    );
    return result.rows;
  }
};

module.exports = LivroEditora;
