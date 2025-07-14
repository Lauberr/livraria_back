const Emprestimo = require('../models/emprestimoModel');
const { enviarEmailEmprestimo } = require('../services/emailService');
const Locatario = require('../models/locatarioModel');
const Livro = require('../models/livroModel');


module.exports = {
async criar(req, res) {
  try {
    const { id_locatario, id_livro } = req.body;
    const emprestimo = await Emprestimo.criar({ id_locatario, id_livro });

    const dataEmprestimoFormatada = new Date(emprestimo.data_hora_emprestimo).toLocaleString('pt-BR', {
      timeZone: 'America/Sao_Paulo'
    });

    const dataDevolucaoFormatada = new Date(emprestimo.data_devolucao).toLocaleString('pt-BR', {
      timeZone: 'America/Sao_Paulo'
    });

    const locatario = await Locatario.buscarPorId(id_locatario);
    const livro = await Livro.obterPorId(id_livro);

    if (locatario && livro) {
      await enviarEmailEmprestimo({
        para: locatario.email_locatario,
        nomeLocatario: locatario.nome_locatario,
        tituloLivro: livro.titulo,
        dataEmprestimo: dataEmprestimoFormatada,
        dataDevolucao: dataDevolucaoFormatada
      });
    }

    res.status(201).json({
      ...emprestimo,
      data_hora_emprestimo: dataEmprestimoFormatada,
      data_devolucao: dataDevolucaoFormatada
    });
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

  async buscarHistoricoPorRA(req, res) {
  try {
    const emprestimos = await Emprestimo.buscarHistoricoPorRA(req.params.ra);
    if (!emprestimos.length) {
      return res.status(404).json({ erro: 'Nenhum empréstimo encontrado para esse RA' });
    }
    res.json(emprestimos);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}




};
