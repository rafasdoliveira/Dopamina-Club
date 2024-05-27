const express = require('express')
const router = express.Router()
const { criarUsuario } = require('../controllers/usuarioController/usuarioController')

router.post('/criarusuario', criarUsuario)

module.exports = router