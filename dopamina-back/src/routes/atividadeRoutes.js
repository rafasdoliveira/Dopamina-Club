const express = require('express');
const atividadeController = require('../controllers/atividadeController/atividadeController');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, async (request, response) => {
    console.log('Rota POST /atividades chamada');
    await atividadeController.criarAtividade(request, response);
});

router.get('/:id', async (request, response) => {
    console.log('Rota GET /atividades/:id chamada');
    await atividadeController.obterAtividade(request, response);
});

router.get('/:id/comentarios', async (request, response) => {
    console.log('Rota GET /atividades/:id/comentarios ');
    await atividadeController.buscarAtividadeComComentarios(request, response);
});

router.put('/:id', async (request, response) => {
    console.log('Rota PUT /atividades/:id chamada');
    await atividadeController.atualizarAtividade(request, response);
});

router.delete('/:id', async (request, response) => {
    console.log('Rota DELETE /atividades/:id chamada');
    await atividadeController.deletarAtividade(request, response);
});

module.exports = router;