const express = require('express');
const router = express.Router();
const controller = require('../controllers/livroController');

router.get('/', controller.listar);
router.get('/detalhes/:id', controller.obterDetalhesLivro);
router.get('/:id', controller.obterPorId);
router.post('/', controller.criar);
router.put('/:id', controller.atualizar);
router.delete('/:id', controller.deletar);
router.get('/titulo/:titulo', controller.obterPorTitulo);


module.exports = router;
