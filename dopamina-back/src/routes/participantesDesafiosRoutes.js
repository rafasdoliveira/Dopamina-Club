const express = require('express');
const desafioController = require('../controllers/participantesDesafiosController/participantesDesafiosController');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/entrar', authMiddleware, async (request, response) => {
    console.log('Rota POST /desafios/entrar chamada');
    await desafioController.entrarNoDesafio(request, response);
});

router.delete('/:id/sair', authMiddleware, async (request, response) => {
    console.log('Rota DELETE /desafios/:id/sair chamada');
    await desafioController.sairDoDesafio(request, response);
});

module.exports = router