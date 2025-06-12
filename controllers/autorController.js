const Autor = require('../models/autorModel');

module.exports = {
  listarAutores: async (req, res) => {
    try {
      const autores = await Autor.listar();
      res.json(autores);
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao listar autores', detalhe: err.message });
    }
  },

  obterAutor: async (req, res) => {
    try {
      const autor = await Autor.obterPorId(req.params.id);
      if (!autor) return res.status(404).json({ erro: 'Autor não encontrado' });
      res.json(autor);
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao buscar autor', detalhe: err.message });
    }
  },

  criarAutor: async (req, res) => {
    try {
      const novoAutor = await Autor.criar(req.body.nome_autor);
      res.status(201).json(novoAutor);
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao criar autor', detalhe: err.message });
    }
  },

  atualizarAutor: async (req, res) => {
    try {
      const autorAtualizado = await Autor.atualizar(req.params.id, req.body.nome_autor);
      if (!autorAtualizado) return res.status(404).json({ erro: 'Autor não encontrado' });
      res.json(autorAtualizado);
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao atualizar autor', detalhe: err.message });
    }
  },

  deletarAutor: async (req, res) => {
    try {
      await Autor.deletar(req.params.id);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao deletar autor', detalhe: err.message });
    }
  }
};
