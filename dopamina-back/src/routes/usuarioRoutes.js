const express = require('express');
const usuarioController = require('../controllers/usuarioController/usuarioController');
const { authMiddleware } = require('../middlewares/authMiddleware')

const router = express.Router();

router.post('/', authMiddleware, async (request, response, next) => {
    try {
        console.log('Rota POST /usuarios chamada');
        await usuarioController.criarUsuario(request, response);
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

router.delete('/me', async (request, response, next) => {
    try {
        console.log('Rota DELETE /usuarios/me chamada');
        await usuarioController.deletarUsuario(request, response);
    } catch (error) {
        next(error);
    }
});

router.get('/me', authMiddleware, async (request, response, next) => {
    try {
        console.log('Rota GET /usuarios/me chamada');
        await usuarioController.obterUsuario(request, response);
    } catch (error) {
        next(error);
    }
});


module.exports = router;
