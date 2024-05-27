const express = require('express');
const authController = require('../controllers/authController/authController');

const router = express.Router();

router.post('/login', (request, response, next) => {
    console.log('Rota /login chamada'); 
    authController.login(request, response).catch(next);
});

module.exports = router;
