const express = require('express');
const router = express.Router();
const editoraController = require('../controllers/editoraController');

router.get('/', editoraController.listarEditoras);
router.get('/:id', editoraController.obterEditora);
router.post('/', editoraController.criarEditora);
router.put('/:id', editoraController.atualizarEditora);
router.delete('/:id', editoraController.deletarEditora);

module.exports = router;
