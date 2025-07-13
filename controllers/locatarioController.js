const Locatario = require("../models/locatarioModel");

module.exports = {
  async criar(req, res) {
    try {
      const novo = await Locatario.criar(req.body);
      res.status(201).json(novo);
    } catch (err) {
      res.status(500).json({ erro: err.message });
    }
  },

  async listarTodos(req, res) {
    try {
      const lista = await Locatario.listarTodos();
      res.json(lista);
    } catch (err) {
      res.status(500).json({ erro: err.message });
    }
  },

  async buscarPorId(req, res) {
    try {
      const locatario = await Locatario.buscarPorId(req.params.id);
      if (!locatario)
        return res.status(404).json({ erro: "Locatário não encontrado" });
      res.json(locatario);
    } catch (err) {
      res.status(500).json({ erro: err.message });
    }
  },

  async buscarPorRA(req, res) {
    try {
      const locatario = await Locatario.buscarPorRA(req.params.ra);
      if (!locatario) {
        return res.status(404).json({ erro: "Locatário não encontrado" });
      }
      res.json(locatario);
    } catch (err) {
      res.status(500).json({ erro: err.message });
    }
  },

  async atualizar(req, res) {
    try {
      const atualizado = await Locatario.atualizar(req.params.id, req.body);
      if (!atualizado)
        return res.status(404).json({ erro: "Locatário não encontrado" });
      res.json(atualizado);
    } catch (err) {
      res.status(500).json({ erro: err.message });
    }
  },

  async deletar(req, res) {
    try {
      const deletado = await Locatario.deletar(req.params.id);
      if (!deletado)
        return res.status(404).json({ erro: "Locatário não encontrado" });
      res.json({ mensagem: "Locatário deletado com sucesso" });
    } catch (err) {
      res.status(500).json({ erro: err.message });
    }
  },
};
