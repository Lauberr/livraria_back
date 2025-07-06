const Divida = require('../models/dividaModel');

module.exports = {
  async criar(req, res) {
    try {
      const divida = await Divida.criar(req.body);
      res.status(201).json(divida);
    } catch (err) {
      res.status(400).json({ erro: err.message });
    }
  },

  async listar(req, res) {
    try {
      const dividas = await Divida.listarTodas();
      res.json(dividas);
    } catch (err) {
      res.status(500).json({ erro: err.message });
    }
  },

  async quitar(req, res) {
    try {
      const { id } = req.params;
      const quitada = await Divida.quitar(id);
      if (!quitada) {
        return res.status(404).json({ erro: 'Dívida não encontrada.' });
      }
      res.json(quitada);
    } catch (err) {
      res.status(500).json({ erro: err.message });
    }
  },

  async listarNaoQuitadas(req, res) {
  try {
    const dividas = await dividasModel.listarNaoQuitadas();
    res.json(dividas);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
}

};
