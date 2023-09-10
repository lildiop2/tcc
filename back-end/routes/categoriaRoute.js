const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');
const authenticated = require('../middlewares/authenticated');
const isAdmin = require('../middlewares/isAdmin');


router.get('/categorias',  categoriaController.listarTodosOsCategorias);
router.get('/categoria/:id', categoriaController.retornarCategoriaPorId);
router.post('/categoria', categoriaController.adicionarCategoria);
router.put('/categoria/:id', categoriaController.atualizarCategoria);
router.delete('/categoria/:id', categoriaController.removerCategoria);

module.exports = router;
