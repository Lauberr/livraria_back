const Cargo = require('../models/cargoModel');

module.exports = {
  listarCargos: async (req, res) => {
    try {
      const cargos = await Cargo.listar();
      res.json(cargos);
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao listar cargos', detalhe: err.message });
    }
  },

  obterCargo: async (req, res) => {
    try {
      const cargo = await Cargo.obterPorId(req.params.id);
      if (!cargo) return res.status(404).json({ erro: 'Cargo não encontrado' });
      res.json(cargo);
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao buscar cargo', detalhe: err.message });
    }
  },

  criarCargo: async (req, res) => {
    try {
      const { descricao, qt_livro } = req.body;
      const novoCargo = await Cargo.criar(descricao, qt_livro);
      res.status(201).json(novoCargo);
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao criar cargo', detalhe: err.message });
    }
  },

  atualizarCargo: async (req, res) => {
    try {
      const { descricao, qt_livro } = req.body;
      const cargoAtualizado = await Cargo.atualizar(req.params.id, descricao, qt_livro);
      if (!cargoAtualizado) return res.status(404).json({ erro: 'Cargo não encontrado' });
      res.json(cargoAtualizado);
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao atualizar cargo', detalhe: err.message });
    }
  },

  deletarCargo: async (req, res) => {
    try {
      await Cargo.deletar(req.params.id);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao deletar cargo', detalhe: err.message });
    }
  }
};
