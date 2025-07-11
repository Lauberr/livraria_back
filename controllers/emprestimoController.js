const Emprestimo = require('../models/emprestimoModel');

module.exports = {
 async criar(req, res) {
  try {
    const { id_locatario, id_livro } = req.body;
    const emprestimo = await Emprestimo.criar({ id_locatario, id_livro });

    emprestimo.data_hora_emprestimo = new Date(emprestimo.data_hora_emprestimo).toLocaleString('pt-BR', {
      timeZone: 'America/Sao_Paulo'
    });

    emprestimo.data_devolucao = new Date(emprestimo.data_devolucao).toLocaleString('pt-BR', {
      timeZone: 'America/Sao_Paulo'
    });

    res.status(201).json(emprestimo);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
},


  async listarTodos(req, res) {
    try {
      const lista = await Emprestimo.listarTodos();
      res.json(lista);
    } catch (err) {
      res.status(500).json({ erro: err.message });
    }
  },

  async buscarPorChave(req, res) {
    try {
      const { id_locatario, id_livro, data_hora_emprestimo } = req.params;
      const emprestimo = await Emprestimo.buscarPorChave(id_locatario, id_livro, data_hora_emprestimo);
      if (!emprestimo) return res.status(404).json({ erro: 'Empréstimo não encontrado' });
      res.json(emprestimo);
    } catch (err) {
      res.status(500).json({ erro: err.message });
    }
  },

  async buscarUltimo(req, res) {
  try {
    const { id_locatario, id_livro } = req.params;
    const emprestimo = await Emprestimo.buscarUltimo(id_locatario, id_livro);

    if (!emprestimo) {
      return res.status(404).json({ erro: 'Empréstimo não encontrado' });
    }

    emprestimo.data_hora_emprestimo = new Date(emprestimo.data_hora_emprestimo).toLocaleString('pt-BR', {
      timeZone: 'America/Sao_Paulo'
    });
    emprestimo.data_devolucao = new Date(emprestimo.data_devolucao).toLocaleString('pt-BR', {
      timeZone: 'America/Sao_Paulo'
    });

    res.json(emprestimo);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
},

  async atualizarDataDevolucao(req, res) {
    try {
      const { id_locatario, id_livro, data_hora_emprestimo } = req.params;
      const { data_devolucao } = req.body;
      const atualizado = await Emprestimo.atualizarDataDevolucao(id_locatario, id_livro, data_hora_emprestimo, data_devolucao);
      if (!atualizado) return res.status(404).json({ erro: 'Empréstimo não encontrado' });
      res.json(atualizado);
    } catch (err) {
      res.status(500).json({ erro: err.message });
    }
  },

  async deletar(req, res) {
    try {
      const { id_locatario, id_livro, data_hora_emprestimo } = req.params;
      const deletado = await Emprestimo.deletar(id_locatario, id_livro, data_hora_emprestimo);
      if (!deletado) return res.status(404).json({ erro: 'Empréstimo não encontrado' });
      res.json({ mensagem: 'Empréstimo deletado com sucesso' });
    } catch (err) {
      res.status(500).json({ erro: err.message });
    }
  },


};
