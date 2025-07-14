const express = require('express');
const router = express.Router();
const controller = require('../controllers/livroEditoraController');

router.post('/', controller.vincular);
router.get('/', controller.listar);
router.get('/:id', controller.buscarPorLivro); 

module.exports = router;
