const express = require('express');
const atividadeController = require('../controllers/atividadeController/atividadeController')

const router = express.Router();

router.post('/', (request, response, next) => {
    console.log('Rota /atividades chamada');
    atividadeController.criarAtividade(request, response).catch(next);
});

router.get('/:id', (request, response, next) => {
    console.log('Rota GET /atividades/:id chamada');
    atividadeController.obterAtividade(request, response).catch(next);
});

router.put('/:id', (request, response, next) => {
    console.log('Rota PUT /atividades/:id chamada');
    atividadeController.atualizarAtividade(request, response).catch(next);
});

router.delete('/:id', (request, response, next) => {
    console.log('Rota DELETE /atividades/:id chamada');
    atividadeController.deletarAtividade(request, response).catch(next);
});

module.exports = router;
