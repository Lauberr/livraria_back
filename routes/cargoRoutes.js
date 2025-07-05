const express = require('express');
const router = express.Router();
const cargoController = require('../controllers/cargoController');

router.get('/', cargoController.listarCargos);
router.get('/:id', cargoController.obterCargo);
router.post('/', cargoController.criarCargo);
router.put('/:id', cargoController.atualizarCargo);
router.delete('/:id', cargoController.deletarCargo);

module.exports = router;
