const express = require('express');
const router = express.Router();
const controller = require('../controllers/dividaController');
// comentei pra tu saber oq cada um faz
router.post('/', controller.criar);           // Criar dívida (se houver atraso)
router.get('/', controller.listar);           // Listar todas as dívidas
router.put('/:id/quitar', controller.quitar); // Quitar dívida
router.get('/nao-quitadas', controller.listarNaoQuitadas); //listas n quitadas


module.exports = router;
