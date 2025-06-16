const Categoria = require('../models/categoriaModel');

module.exports = {
  listarCategoria: async (req, res) => {
    try {
      const categoria = await Categoria.listar();
      res.json(categoria);
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao listar categoria', detalhe: err.message });
    }
  },

  obterCategoria: async (req, res) => {
    try {
      const categoria = await Categoria.obterPorId(req.params.id);
      if (!categoria) return res.status(404).json({ erro: 'Categoria não encontrada' });
      res.json(categoria);
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao buscar categoria', detalhe: err.message });
    }
  },

  criarCategoria: async (req, res) => {
    try {
      const novaCategoria = await Categoria.criar(req.body.nome_categoria);
      res.status(201).json(novaCategoria);
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao criar categoria', detalhe: err.message });
    }
  },

  atualizarCategoria: async (req, res) => {
    try {
      const categoriaAtualizada = await Categoria.atualizar(req.params.id, req.body.nome_categoria);
      if (!categoriaAtualizada) return res.status(404).json({ erro: 'Categoria não encontrada' });
      res.json(categoriaAtualizada);
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao atualizar categoria', detalhe: err.message });
    }
  },

  deletarCategoria: async (req, res) => {
    try {
      await Categoria.deletar(req.params.id);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao deletar categoria', detalhe: err.message });
    }
  }
};
