const express = require('express');
const router = express.Router();
const controller = require('../controllers/locatarioController');

router.post('/', controller.criar);
router.get('/', controller.listarTodos);
router.get('/:id', controller.buscarPorId);
router.put('/:id', controller.atualizar);
router.delete('/:id', controller.deletar);
router.get('/ra/:ra', controller.buscarPorRA);


module.exports = router;
