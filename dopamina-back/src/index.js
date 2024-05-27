// Importações
const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');

// Controllers
const usuarioController = require('./controllers/usuarioController/usuarioController');
const empresaController = require('./controllers/empresaController/empresaController');
const authController = require('./controllers/authController/authController');

// Configurações do aplicativo
const app = express();
const PORT = process.env.PORT || 3200;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
app.get('/', (request, response) => {
    response.json({ info: 'Nodejs, Express and Supabase API' });
});

app.post('/usuarios', (request, response, next) => {
    console.log('Rota /usuarios chamada');
    usuarioController.criarUsuario(request, response).catch(next);
});

app.post('/empresas', (request, response, next) => {
    console.log('Rota /empresas chamada');
    empresaController.criarEmpresa(request, response).catch(next);
});

app.post('/login', (request, response, next) => {
    console.log('Rota /login chamada');
    authController.login(request, response).catch(next);
});

app.get('/home', (request, response) => {
    response.sendFile('index.html', { root: __dirname });
});

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
    console.error('Erro detectado:', err);
    res.status(500).json({ error: 'Internal Server Error' });
});

// Inicialização do servidor
app.listen(PORT, () => {
    console.log(`Aplicação rodando na porta: ${PORT}`);
});
