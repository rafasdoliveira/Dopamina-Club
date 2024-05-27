const express = require('express');
const empresaController = require('../controllers/empresaController/empresaController');

const router = express.Router();

router.post('/', (request, response, next) => {
    console.log('Rota /empresas chamada');
    empresaController.criarEmpresa(request, response).catch(next);
});

module.exports = router;
