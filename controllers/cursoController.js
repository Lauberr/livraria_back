const Curso = require('../models/cursoModel');

module.exports = {
  async criar(req, res) {
    try {
      const novoCurso = await Curso.criar(req.body);
      res.status(201).json(novoCurso);
    } catch (err) {
      res.status(500).json({ erro: err.message });
    }
  },

  async listarTodos(req, res) {
    try {
      const cursos = await Curso.listarTodos();
      res.json(cursos);
    } catch (err) {
      res.status(500).json({ erro: err.message });
    }
  },

  async buscarPorId(req, res) {
    try {
      const curso = await Curso.buscarPorId(req.params.id);
      if (!curso) return res.status(404).json({ erro: 'Curso não encontrado' });
      res.json(curso);
    } catch (err) {
      res.status(500).json({ erro: err.message });
    }
  },

  async atualizar(req, res) {
    try {
      const atualizado = await Curso.atualizar(req.params.id, req.body);
      if (!atualizado) return res.status(404).json({ erro: 'Curso não encontrado' });
      res.json(atualizado);
    } catch (err) {
      res.status(500).json({ erro: err.message });
    }
  },

  async deletar(req, res) {
    try {
      const deletado = await Curso.deletar(req.params.id);
      if (!deletado) return res.status(404).json({ erro: 'Curso não encontrado' });
      res.json({ mensagem: 'Curso deletado com sucesso' });
    } catch (err) {
      res.status(500).json({ erro: err.message });
    }
  }
};
