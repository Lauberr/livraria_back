const CategoriaLivro = require('../models/categoriaLivroModel');

async function adicionarCategoria(req, res) {
  try {
    const { id_livro, id_cat } = req.body;
    const novaRelacao = await CategoriaLivro.adicionarCategoriaAoLivro(id_livro, id_cat);
    res.status(201).json(novaRelacao);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}

async function listarCategorias(req, res) {
  try {
    const { id_livro } = req.params;
    const categorias = await CategoriaLivro.listarCategoriasDoLivro(id_livro);
    res.json(categorias);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}

module.exports = {
  adicionarCategoria,
  listarCategorias
};
