const express = require('express');
const router = express.Router();
const controller = require('../controllers/categoriaLivroController');

router.post('/', controller.adicionarCategoria);
router.get('/:id_livro', controller.listarCategorias);

module.exports = router;
