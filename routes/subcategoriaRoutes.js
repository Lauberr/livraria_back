const express = require('express');
const router = express.Router();
const subcategoriaController = require('../controllers/subcategoriaController');

router.get('/', subcategoriaController.listarSubcategoria);
router.get('/categoria/:id_cat', subcategoriaController.buscarPorCategoria);
router.get('/:id', subcategoriaController.obterSubcategoria);
router.post('/', subcategoriaController.criarSubcategoria);
router.put('/:id', subcategoriaController.atualizarSubcategoria);
router.delete('/:id', subcategoriaController.deletarSubcategoria);


module.exports = router;
