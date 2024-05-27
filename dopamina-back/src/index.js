// Importações
const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');

// Importação de Roteadores
const usuarioRoutes = require('./routes/usuarioRoutes');
const empresaRoutes = require('./routes/empresaRoutes');
const authRoutes = require('./routes/authRoutes');

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

// Monta o roteador de usuários no caminho base /usuarios
app.use('/usuarios', usuarioRoutes);

// Monta os outros roteadores
app.use('/empresas', empresaRoutes);
app.use('/login', authRoutes);

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
