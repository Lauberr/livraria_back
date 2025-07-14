const db = require("../config/database");

module.exports = {
  listar: async () => {
    const result = await db.query("SELECT * FROM livro");
    return result.rows;
  },

  obterPorId: async (id) => {
    const result = await db.query("SELECT * FROM livro WHERE id_livro = $1", [
      id,
    ]);
    return result.rows[0];
  },

  async obterPorTitulo(titulo) {
    const result = await db.query("SELECT * FROM livro WHERE titulo ILIKE $1", [
      titulo,
    ]);
    return result.rows;
  },

  buscarAutores: async (id_livro) => {
    const result = await db.query(
      `SELECT a.nome_autor FROM autores a
       JOIN autor_livro al ON a.id_autor = al.id_autor
       WHERE al.id_livro = $1`,
      [id_livro]
    );
    return result.rows.map((r) => r.nome_autor);
  },

  buscarEditora: async (id_livro) => {
    const result = await db.query(
      `SELECT e.nome_editora, e.data_publicacao FROM editora e
       JOIN editora_livro el ON e.id_editora = el.id_editora
       WHERE el.id_livro = $1`,
      [id_livro]
    );
    return result.rows[0];
  },

  buscarCategoria: async (id_livro) => {
    const result = await db.query(
      `SELECT c.nome_cat FROM categoria c
       JOIN categoria_livro cl ON c.id_cat = cl.id_cat
       WHERE cl.id_livro = $1`,
      [id_livro]
    );
    return result.rows.map((r) => r.nome_cat);
  },

  criar: async (dados) => {
    const {
      isbn,
      titulo,
      qt_disponivel,
      disponivel,
      edicao,
      capa,
      autores = [],
      editora,
      categoria = [],
      data_publicacao,
    } = dados;

    const result = await db.query(
      `INSERT INTO livro (isbn, titulo, qt_disponivel, disponivel, edicao, capa)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [isbn, titulo, qt_disponivel, disponivel, edicao, capa]
    );

    const id_livro = result.rows[0].id_livro;

    let listaAutores = autores;
    if (typeof autores === "string") {
      try {
        listaAutores = JSON.parse(autores);
      } catch (e) {
        console.warn("Autores não estavam em JSON válido:", autores);
        listaAutores = [];
      }
    }

    const autoresUnicos = [...new Set(listaAutores)];
    for (const autor of autoresUnicos) {
      const autorExistente = await db.query(
        "SELECT id_autor FROM autores WHERE nome_autor = $1",
        [autor]
      );
      let idAutor;

      if (autorExistente.rows.length > 0) {
        idAutor = autorExistente.rows[0].id_autor;
      } else {
        const novoAutor = await db.query(
          "INSERT INTO autores (nome_autor) VALUES ($1) RETURNING id_autor",
          [autor]
        );
        idAutor = novoAutor.rows[0].id_autor;
      }

      await db.query(
        "INSERT INTO autor_livro (id_livro, id_autor) VALUES ($1, $2) ON CONFLICT DO NOTHING",
        [id_livro, idAutor]
      );
    }

    if (editora) {
      let ed = await db.query(
        "SELECT id_editora FROM editora WHERE nome_editora = $1",
        [editora]
      );
      if (ed.rows.length === 0) {
        ed = await db.query(
          "INSERT INTO editora (nome_editora, data_publicacao) VALUES ($1, $2) RETURNING id_editora",
          [editora, data_publicacao || null]
        );
      }
      await db.query(
        "INSERT INTO editora_livro (id_livro, id_editora) VALUES ($1, $2)",
        [id_livro, ed.rows[0].id_editora]
      );
    }

    for (const nome of categoria) {
      let cat = await db.query(
        "SELECT id_cat FROM categoria WHERE nome_cat = $1",
        [nome]
      );
      if (cat.rows.length === 0) {
        cat = await db.query(
          "INSERT INTO categoria (nome_cat) VALUES ($1) RETURNING id_cat",
          [nome]
        );
      }
      await db.query(
        "INSERT INTO categoria_livro (id_livro, id_cat) VALUES ($1, $2)",
        [id_livro, cat.rows[0].id_cat]
      );
    }

    return result.rows[0];
  },

  atualizar: async (id, dados) => {
    const { isbn, titulo, qt_disponivel, disponivel, edicao, capa } = dados;
    const result = await db.query(
      `UPDATE livro SET isbn=$1, titulo=$2, qt_disponivel=$3, disponivel=$4, edicao=$5, capa=$6 WHERE id_livro=$7 RETURNING *`,
      [isbn, titulo, qt_disponivel, disponivel, edicao, capa, id]
    );
    return result.rows[0];
  },

  deletar: async (id) => {
    await db.query("DELETE FROM livro WHERE id_livro = $1", [id]);
  },
};
