const express = require('express');
const router = express.Router();
const carrinhoController = require('../controllers/carrinhoController');
const authenticated = require('../middlewares/authenticated');
const isAdmin = require('../middlewares/isAdmin');


router.get('/carrinhos',  carrinhoController.listarTodosOsCarrinhos);
router.get('/carrinho/:id', carrinhoController.retornarCarrinhoPorId);
router.post('/carrinho', carrinhoController.adicionarCarrinho);
router.put('/carrinho/:id', carrinhoController.atualizarCarrinho);
router.delete('/carrinho/:id', carrinhoController.removerCarrinho);

module.exports = router;
