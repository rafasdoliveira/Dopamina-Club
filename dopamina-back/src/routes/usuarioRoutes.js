const express = require('express');
const usuarioController = require('../controllers/usuarioController/usuarioController');

const router = express.Router();

router.post('/', (request, response, next) => {
    console.log('Rota /usuarios chamada');
    usuarioController.criarUsuario(request, response).catch(next);
});

router.get('/:id', (request, response, next) => {
    console.log('Rota GET /usuarios/:id chamada');
    usuarioController.obterUsuario(request, response).catch(next);
});

router.put('/:id', (request, response, next) => {
    console.log('Rota PUT /usuarios/:id chamada');
    usuarioController.atualizarUsuario(request, response).catch(next);
});

router.delete('/:id', (request, response, next) => {
    console.log('Rota DELETE /usuarios/:id chamada');
    usuarioController.deletarUsuario(request, response).catch(next);
});

module.exports = router;
