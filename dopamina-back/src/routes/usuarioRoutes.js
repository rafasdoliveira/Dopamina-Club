const express = require('express');
const usuarioController = require('../controllers/usuarioController/usuarioController');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', async (request, response, next) => {
    try {
        console.log('Rota POST /usuarios chamada');
        await usuarioController.criarUsuario(request, response);
    } catch (error) {
        next(error);
    }
});

router.get('/me', authMiddleware, async (request, response, next) => {
    try {
        console.log('Rota GET /usuarios/me chamada');
        await usuarioController.obterUsuarioPorId(request, response);
    } catch (error) {
        next(error);
    }
});

router.get('/', authMiddleware, async (request, response, next) => {
    try {
        console.log('Rota GET /usuarios chamada');
        await usuarioController.listarUsuarios(request, response);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', authMiddleware, async (request, response, next) => {
    try {
        console.log('Rota GET /usuarios/:id chamada');
        await usuarioController.obterUsuarioPorId(request, response);
    } catch (error) {
        next(error);
    }
});

router.put('/:id', authMiddleware, async (request, response, next) => {
    try {
        console.log('Rota PUT /usuarios/:id chamada');
        await usuarioController.atualizarUsuario(request, response);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', authMiddleware, async (request, response, next) => {
    try {
        console.log('Rota DELETE /usuarios/:id chamada');
        await usuarioController.deletarUsuario(request, response);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
