const express = require('express');
const router = express.Router();
const controller = require('../controllers/autorLivroController');

router.post('/', controller.adicionar);
router.get('/:id_livro', controller.listarAutoresPorLivro);
router.delete('/', controller.remover);
router.get('/autor/nome/:nome', controller.listarLivrosPorNomeAutor);

module.exports = router;
