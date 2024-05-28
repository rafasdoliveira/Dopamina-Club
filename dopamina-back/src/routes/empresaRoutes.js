const express = require('express');
const empresaController = require('../controllers/empresaController/empresaController');

const router = express.Router();

router.post('/', (request, response, next) => {
    console.log('Rota POST /empresas chamada');
    empresaController.criarEmpresa(request, response).catch(next);
});

router.get('/:id', (request, response, next) => {
    console.log('Rota GET /empresas chamada')
    empresaController.obterEmpresa(request, response).catch(next)
})

router.put('/:id', (request, response, next) => {
    console.log('Rota PUT /empresas chamada')
    empresaController.atualizarEmpresa(request, response).catch(next)
})

router.delete('/:id', (request, response, next) => {
    console.log('Rota DELETE /empresas chamadas')
    empresaController.deletarEmpresa(request, response).catch(next)
})

module.exports = router;
