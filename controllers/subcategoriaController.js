const Subcategoria = require('../models/subcategoriaModel');

module.exports = {
  listarSubcategoria: async (req, res) => {
  try {
    const lista = await Subcategoria.listar();
    res.json(lista);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao listar Subcategoria', detalhe: err.message });
  }
},

  obterSubcategoria: async (req, res) => {
    try {
      const Subcategoria = await Subcategoria.obterPorId(req.params.id);
      if (!Subcategoria) return res.status(404).json({ erro: 'Subcategoria não encontrada' });
      res.json(Subcategoria);
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao buscar Subcategoria', detalhe: err.message });
    }
  },

  async buscarPorCategoria(req, res) {
  try {
    const id_cat = req.params.id_cat;
    const subcats = await Subcategoria.buscarPorCategoria(id_cat);
    res.json(subcats);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
},


  criarSubcategoria: async (req, res) => {
    try {
      const novaSubcategoria = await Subcategoria.criar(req.body.nome_Subcategoria);
      res.status(201).json(novaSubcategoria);
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao criar Subcategoria', detalhe: err.message });
    }
  },

  atualizarSubcategoria: async (req, res) => {
    try {
      const SubcategoriaAtualizada = await Subcategoria.atualizar(req.params.id, req.body.nome_Subcategoria);
      if (!SubcategoriaAtualizada) return res.status(404).json({ erro: 'Subcategoria não encontrada' });
      res.json(SubcategoriaAtualizada);
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao atualizar Subcategoria', detalhe: err.message });
    }
  },

  deletarSubcategoria: async (req, res) => {
    try {
      await Subcategoria.deletar(req.params.id);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao deletar Subcategoria', detalhe: err.message });
    }
  }
};
