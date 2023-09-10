const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');
const authenticated = require('../middlewares/authenticated');
const isAdmin = require('../middlewares/isAdmin');


router.get('/produtos',  produtoController.listarTodosOsProdutos);
router.get('/produto/:id', produtoController.retornarProdutoPorId);
router.post('/produto', produtoController.adicionarProduto);
router.put('/produto/:id', produtoController.atualizarProduto);
router.delete('/produto/:id', produtoController.removerProduto);

module.exports = router;
