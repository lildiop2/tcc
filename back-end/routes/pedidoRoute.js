const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');
const authenticated = require('../middlewares/authenticated');
const isAdmin = require('../middlewares/isAdmin');


router.get('/pedidos',  pedidoController.listarTodosOsPedidos);
router.get('/pedido/:id', pedidoController.retornarPedidoPorId);
router.post('/pedido', pedidoController.adicionarPedido);
router.put('/pedido/:id', pedidoController.atualizarPedido);
router.delete('/pedido/:id', pedidoController.removerPedido);

module.exports = router;
