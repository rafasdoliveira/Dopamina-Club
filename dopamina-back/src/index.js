// Importações
const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');

// Importação de Roteadores
const usuarioRoutes = require('./routes/usuarioRoutes');
const empresaRoutes = require('./routes/empresaRoutes');
const authRoutes = require('./routes/authRoutes');
const desafioRoutes = require('./routes/desafioRoutes');
const comentarioRoutes = require('./routes/comentarioRoutes')
const atividadeRoutes = require('./routes/atividadeRoutes')
const participantesDesafiosRoutes = require('./routes/participantesDesafiosRoutes')

// Configurações do aplicativo
const app = express();
const PORT = process.env.PORT || 3200;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
    console.error('Erro detectado:', err);
    res.status(500).json({ error: 'Internal Server Error' });
});

// Rotas
app.get('/', (request, response) => {
    response.json({ info: 'Nodejs, Express and Supabase API' });
});

app.use('/login', authRoutes);
app.use('/usuarios', usuarioRoutes);
app.use('/empresas', empresaRoutes);
app.use('/desafios', desafioRoutes);
app.use('/atividades', atividadeRoutes); 
app.use('/comentarios', comentarioRoutes)
app.use('/participantes', participantesDesafiosRoutes)

app.get('/home', (request, response) => {
    response.sendFile('index.html', { root: __dirname });
});


// Inicialização do servidor
app.listen(PORT, () => {
    console.log(`Aplicação rodando na porta: ${PORT}`);
});
