const model = require('../models/autorLivroModel');

module.exports = {
  async adicionar(req, res) {
    try {
      const { id_autor, id_livro } = req.body;
      const resultado = await model.adicionarAutorAoLivro(id_autor, id_livro);
      res.status(201).json(resultado);
    } catch (erro) {
      res.status(400).json({ erro: erro.message });
    }
  },

  async listarAutoresPorLivro(req, res) {
    try {
      const { id_livro } = req.params;
      const autores = await model.listarAutoresPorLivro(id_livro);
      res.status(200).json(autores);
    } catch (erro) {
      res.status(400).json({ erro: erro.message });
    }
  },

  async remover(req, res) {
    try {
      const { id_autor, id_livro } = req.body;
      const resultado = await model.removerAutorDoLivro(id_autor, id_livro);
      res.status(200).json(resultado);
    } catch (erro) {
      res.status(400).json({ erro: erro.message });
    }
  },

  async listarLivrosPorNomeAutor(req, res) {
    try {
      const { nome } = req.params;
      const livros = await model.listarLivrosPorNomeAutor(nome);
      res.status(200).json(livros);
    } catch (erro) {
      res.status(400).json({ erro: erro.message });
    }
  }
};


