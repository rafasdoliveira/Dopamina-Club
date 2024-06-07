const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.SECRET_TOKEN;

if (!secret) {
    throw new Error('SECRET_TOKEN não definido nas variáveis de ambiente');
}

const authMiddleware = (request, response, next) => {
    const authHeader = request.header('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.error('Acesso negado. Nenhum token fornecido ou token malformado');
        return response.status(401).json({ message: 'Acesso negado. Nenhum token fornecido ou token malformado' });
    }

    const token = authHeader.split(' ')[1];
    
    if (!token) {
        console.error('Token não fornecido após "Bearer "');
        return response.status(401).json({ message: 'Token não fornecido' });
    }

    try {
        const decoded = jwt.verify(token, secret);
        request.user = decoded;
        next();
    } catch (error) {
        console.error('Erro ao verificar o token:', error);
        if (error.name === 'TokenExpiredError') {
            return response.status(401).json({ message: 'Token expirado' });
        } else if (error.name === 'JsonWebTokenError') {
            return response.status(401).json({ message: 'Token inválido' });
        } else {
            return response.status(500).json({ message: 'Erro interno do servidor' });
        }
    }
};

module.exports = {
    authMiddleware
};
