const express = require('express');
const comentarioController = require('../controllers/comentarioController/comentarioController');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, async (request, response) => {
    console.log('Rota POST /comentarios chamada');
    await comentarioController.criarComentario(request, response);
});

module.exports = router;
