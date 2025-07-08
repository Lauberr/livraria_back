const path = require('path');
const fs = require('fs');
const Livro = require('../models/livroModel');

function salvarImagem(arquivo) {
  const nome = `${Date.now()}_${arquivo.name}`;
  const caminho = path.join(__dirname, '..', 'imagens', nome);
  arquivo.mv(caminho);
  return `/imagens/${nome}`;
}

module.exports = {
  listar: async (req, res) => {
    try {
      const livros = await Livro.listar();
      res.json(livros);
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao listar livros', detalhe: err.message });
    }
  },

  obterPorId: async (req, res) => {
    try {
      const livro = await Livro.obterPorId(req.params.id);
      if (!livro) return res.status(404).json({ erro: 'Livro não encontrado' });

      const autores = await Livro.buscarAutores(req.params.id);
      const editora = await Livro.buscarEditora(req.params.id);
      const categoria = await Livro.buscarCategoria(req.params.id);

      res.json({ ...livro, autor: autores, editora, categoria });
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao buscar livro', detalhe: err.message });
    }
  },

  criar: async (req, res) => {
    try {
      const {
        isbn,
        titulo,
        qt_disponivel,
        edicao,
        autores,
        editora,
        categoria,
        subcategoria,
        data_publicacao,
        disponivel
      } = req.body;

      const capa = req.files?.capa ? salvarImagem(req.files.capa) : null;
      const statusDisponivel = disponivel === 'true' || disponivel === '1' || disponivel === true ? 1 : 0;

      const novoLivro = await Livro.criar({
        isbn,
        titulo,
        qt_disponivel,
        disponivel: statusDisponivel,
        edicao,
        capa,
        autores,
        editora,
        categoria,
        subcategoria,
        data_publicacao
      });

      res.status(201).json(novoLivro);
    } catch (err) {
      console.error('Erro ao criar livro:', err);
      res.status(500).json({ erro: 'Erro ao criar livro', detalhe: err.message });
    }
  },

  atualizar: async (req, res) => {
    try {
      const id = req.params.id;
      const livroExistente = await Livro.obterPorId(id);
      if (!livroExistente) return res.status(404).json({ erro: 'Livro não encontrado' });

      const {
        isbn,
        titulo,
        qt_disponivel,
        edicao,
        autores,
        editora,
        categoria,
        subcategoria,
        data_publicacao,
        disponivel
      } = req.body;

      let capa = livroExistente.capa;
      if (req.files?.capa) {
        capa = salvarImagem(req.files.capa);
        if (livroExistente.capa) {
          const caminhoAntigo = path.join(__dirname, '..', livroExistente.capa);
          if (fs.existsSync(caminhoAntigo)) fs.unlinkSync(caminhoAntigo);
        }
      }

      const statusDisponivel = disponivel === 'true' || disponivel === '1' || disponivel === true ? 1 : 0;

      const atualizado = await Livro.atualizar(id, {
        isbn,
        titulo,
        qt_disponivel,
        disponivel: statusDisponivel,
        edicao,
        capa,
        autores,
        editora,
        categoria,
        subcategoria,
        data_publicacao
      });

      res.json(atualizado);
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao atualizar livro', detalhe: err.message });
    }
  },

  deletar: async (req, res) => {
    try {
      const livro = await Livro.obterPorId(req.params.id);
      if (!livro) return res.status(404).json({ erro: 'Livro não encontrado' });

      if (livro.capa) {
        const caminho = path.join(__dirname, '..', livro.capa);
        if (fs.existsSync(caminho)) fs.unlinkSync(caminho);
      }

      await Livro.deletar(req.params.id);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao deletar livro', detalhe: err.message });
    }
  }
};
