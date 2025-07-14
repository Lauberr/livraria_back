const db = require('../config/database');

async function adicionarCategoriaAoLivro(id_livro, id_cat) {
  const result = await db.query(
    `INSERT INTO categoria_livro (id_livro, id_cat)
     VALUES ($1, $2)
     ON CONFLICT DO NOTHING RETURNING *`,
    [id_livro, id_cat]
  );
  return result.rows[0];
}

async function listarCategoriasDoLivro(id_livro) {
  const result = await db.query(
    `SELECT c.id_cat, c.nome_cat
     FROM categoria_livro cl
     JOIN categoria c ON cl.id_cat = c.id_cat
     WHERE cl.id_livro = $1`,
    [id_livro]
  );
  return result.rows;
}

module.exports = {
  adicionarCategoriaAoLivro,
  listarCategoriasDoLivro
};
