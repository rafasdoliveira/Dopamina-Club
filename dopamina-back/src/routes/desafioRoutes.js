const express = require('express');
const desafioController = require('../controllers/desafioController/desafioController');

const router = express.Router();

router.post('/', (request, response, next) => {
    console.log('Rota /desafios chamada');
    desafioController.criarDesafio(request, response).catch(next);
});

router.get('/:id', (request, response, next) => {
    console.log('Rota GET /desafios/:id chamada');
    desafioController.obterDesafio(request, response).catch(next);
});

router.put('/:id', (request, response, next) => {
    console.log('Rota PUT /desafios/:id chamada');
    desafioController.atualizarDesafio(request, response).catch(next);
});

router.delete('/:id', (request, response, next) => {
    console.log('Rota DELETE /desafios/:id chamada');
    desafioController.deletarDesafio(request, response).catch(next);
});

module.exports = router;
