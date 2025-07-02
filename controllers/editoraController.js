const Editora = require('../models/editoraModel');

module.exports = {
  listarEditoras: async (req, res) => {
    try {
      const editoras = await Editora.listar();
      res.json(editoras);
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao listar editoras', detalhe: err.message });
    }
  },

  obterEditora: async (req, res) => {
    try {
      const editora = await Editora.obterPorId(req.params.id);
      if (!editora) return res.status(404).json({ erro: 'Editora não encontrada' });
      res.json(editora);
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao buscar editora', detalhe: err.message });
    }
  },

  criarEditora: async (req, res) => {
    try {
      const { nome_editora, data_publicacao } = req.body;
      const novaEditora = await Editora.criar(nome_editora, data_publicacao);
      res.status(201).json(novaEditora);
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao criar editora', detalhe: err.message });
    }
  },

  atualizarEditora: async (req, res) => {
    try {
      const { nome_editora, data_publicacao } = req.body;
      const editoraAtualizada = await Editora.atualizar(req.params.id, nome_editora, data_publicacao);
      if (!editoraAtualizada) return res.status(404).json({ erro: 'Editora não encontrada' });
      res.json(editoraAtualizada);
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao atualizar editora', detalhe: err.message });
    }
  },

  deletarEditora: async (req, res) => {
    try {
      await Editora.deletar(req.params.id);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao deletar editora', detalhe: err.message });
    }
  }
};
