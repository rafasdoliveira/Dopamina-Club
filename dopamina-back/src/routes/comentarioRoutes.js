const express = require('express');
const comentarioController = require('../controllers/comentarioController/comentarioController');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, async (request, response) => {
    console.log('Rota POST /comentarios chamada');
    await comentarioController.criarComentario(request, response);
});

router.get('/:atividade_id', async (request, response) => {
    console.log('Rota GET /comentarios/ chamada');
    await comentarioController.obterComentarios(request, response);
});

router.put('/:id', async (request, response) => {
    console.log('Rota PUT /comentarios/:id chamada');
    await comentarioController.atualizarComentario(request, response);
});

router.delete('/:id', async (request, response) => {
    console.log('Rota DELETE /comentarios/:id chamada');
    await comentarioController.deletarComentario(request, response);
});

module.exports = router;
