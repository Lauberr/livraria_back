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

  criar: async (dados) => {
    const {
      isbn,
      titulo,
      qt_disponivel,
      disponivel,
      edicao,
      capa,
      autores,
      editora,
      categoria,
      subcategoria,
      data_publicacao,
    } = dados;

    const result = await db.query(
      `INSERT INTO livro (isbn, titulo, qt_disponivel, disponivel, edicao, capa)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [isbn, titulo, qt_disponivel, disponivel, edicao, capa]
    );

    const livro = result.rows[0];

    // Autor (separado por vírgula)
    const autoresArray = autores?.split(",").map((a) => a.trim()) || [];
    for (const nome of autoresArray) {
      let autorResult = await db.query(
        "SELECT * FROM autores WHERE nome_autor = $1",
        [nome]
      );
      if (autorResult.rows.length === 0) {
        autorResult = await db.query(
          "INSERT INTO autores (nome_autor) VALUES ($1) RETURNING *",
          [nome]
        );
      }
      const autor = autorResult.rows[0];
      await db.query(
        "INSERT INTO autor_livro (id_livro, id_autor) VALUES ($1, $2)",
        [livro.id_livro, autor.id_autor]
      );
    }

    // Editora
    if (editora) {
      let editoraResult = await db.query(
        "SELECT * FROM editora WHERE nome_editora = $1",
        [editora]
      );
      if (editoraResult.rows.length === 0) {
        editoraResult = await db.query(
          "INSERT INTO editora (nome_editora, data_publicacao) VALUES ($1, $2) RETURNING *",
          [editora, data_publicacao || null]
        );
      }
      const editoraData = editoraResult.rows[0];
      await db.query(
        "INSERT INTO editora_livro (id_editora, id_livro) VALUES ($1, $2)",
        [editoraData.id_editora, livro.id_livro]
      );
    }

    // Categoria
    if (categoria) {
      let catResult = await db.query(
        "SELECT * FROM categoria WHERE nome_cat = $1",
        [categoria]
      );
      if (catResult.rows.length === 0) {
        catResult = await db.query(
          "INSERT INTO categoria (nome_cat) VALUES ($1) RETURNING *",
          [categoria]
        );
      }
      const cat = catResult.rows[0];
      await db.query(
        "INSERT INTO categoria_livro (id_cat, id_livro) VALUES ($1, $2)",
        [cat.id_cat, livro.id_livro]
      );
    }

    // Subcategoria
    if (subcategoria) {
      let subResult = await db.query(
        "SELECT * FROM subcategoria WHERE nome_subcat = $1",
        [subcategoria]
      );
      if (subResult.rows.length === 0) {
        subResult = await db.query(
          "INSERT INTO subcategoria (nome_subcat) VALUES ($1) RETURNING *",
          [subcategoria]
        );
      }
      // Aqui não há vínculo direto no seu schema atual, mas podemos criar um JOIN intermediário se quiser depois
    }

    return livro;
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
    await db.query("DELETE FROM livro WHERE id_livro = $1", [id]);
  },
};
