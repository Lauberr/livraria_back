const db = require('../config/database');

module.exports = {
  async adicionarAutorAoLivro(id_autor, id_livro) {
    const result = await db.query(
      'INSERT INTO autor_livro (id_autor, id_livro) VALUES ($1, $2) RETURNING *',
      [id_autor, id_livro]
    );
    return result.rows[0];
  },

  async listarAutoresPorLivro(id_livro) {
    const result = await db.query(
      `SELECT a.* 
       FROM autores a
       JOIN autor_livro al ON a.id_autor = al.id_autor
       WHERE al.id_livro = $1`,
      [id_livro]
    );
    return result.rows;
  },

  async removerAutorDoLivro(id_autor, id_livro) {
    const result = await db.query(
      'DELETE FROM autor_livro WHERE id_autor = $1 AND id_livro = $2 RETURNING *',
      [id_autor, id_livro]
    );
    return result.rows[0];
  },


  async listarLivrosPorNomeAutor(nomeAutor) {
    const result = await db.query(
      `SELECT l.*
       FROM livro l
       JOIN autor_livro al ON l.id_livro = al.id_livro
       JOIN autores a ON al.id_autor = a.id_autor
       WHERE a.nome_autor ILIKE $1`,
      [`%${nomeAutor}%`]
    );
    return result.rows;
  }
};

