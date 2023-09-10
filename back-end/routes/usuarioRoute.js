const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const authenticated = require('../middlewares/authenticated');
const isAdmin = require('../middlewares/isAdmin');


router.post('/login', usuarioController.login);
router.get('/usuarios',  usuarioController.listarTodosOsUsuarios);
router.get('/usuario/:id', usuarioController.retornarUsuarioPorId);
router.post('/usuario', usuarioController.adicionarUsuario);
router.put('/usuario/:id', usuarioController.atualizarUsuario);
router.put('/usuario/:id/password',  usuarioController.trocarSenha)
router.delete('/usuario/:id', usuarioController.removerUsuario);

module.exports = router;
