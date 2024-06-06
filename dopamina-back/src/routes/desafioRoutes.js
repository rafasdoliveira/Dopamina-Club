const express = require('express');
const desafioController = require('../controllers/desafioController/desafioController');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, async (request, response) => {
    console.log('Rota POST /desafios chamada');
    await desafioController.criarDesafio(request, response);
});

router.post('/entrar', async (request, response) => {
    console.log('Rota POST /desafios/entrar chamada');
    await desafioController.entrarNoDesafio(request, response);
});

router.get('/:id', async (request, response) => {
    console.log('Rota GET /desafios/:id chamada');
    await desafioController.obterDesafio(request, response);
});

router.get('/', async (request, response) => {
    console.log('Rota GET /desafios/ chamada');
    await desafioController.obterTodosDesafios(request, response);
});

router.put('/:id(\\d+)', async (request, response) => {
    console.log('Rota PUT /desafios/:id chamada');
    await desafioController.atualizarDesafio(request, response);
});

router.delete('/:id(\\d+)', async (request, response) => {
    console.log('Rota DELETE /desafios/:id chamada');
    await desafioController.deletarDesafio(request, response);
});

module.exports = router;
