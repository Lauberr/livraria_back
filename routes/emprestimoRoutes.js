const express = require('express');
const router = express.Router();
const controller = require('../controllers/emprestimoController');

router.post('/', controller.criar);
router.get('/', controller.listarTodos);
router.get('/ultimo/:id_locatario/:id_livro', controller.buscarUltimo);
router.get('/:id_locatario/:id_livro/:data_hora_emprestimo', controller.buscarPorChave);
router.put('/:id_locatario/:id_livro/:data_hora_emprestimo', controller.atualizarDataDevolucao);
router.delete('/:id_locatario/:id_livro/:data_hora_emprestimo', controller.deletar);
router.get('/historico', controller.listarHistoricoCompleto);



module.exports = router;
