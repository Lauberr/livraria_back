const LivroEditora = require('../models/livroEditoraModel');

module.exports = {
  async vincular(req, res) {
    try {
      const { id_livro, id_editora } = req.body;
      const vinculacao = await LivroEditora.vincular(id_livro, id_editora);
      res.status(201).json(vinculacao);
    } catch (err) {
      res.status(500).json({ erro: err.message });
    }
  },

  async listar(req, res) {
    try {
      const lista = await LivroEditora.listar();
      res.json(lista);
    } catch (err) {
      res.status(500).json({ erro: err.message });
    }
  },

  async buscarPorLivro(req, res) {
    try {
      const id = req.params.id;
      const editoras = await LivroEditora.buscarPorLivro(id);
      res.json(editoras);
    } catch (err) {
      res.status(500).json({ erro: err.message });
    }
  }
};
