const jwt = require('jsonwebtoken');
const secret = process.env.SECRET_TOKEN;

const authMiddleware = (request, response, next) => {
    const authHeader = request.header('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return response.status(401).json({ message: 'Acesso negado. Nenhum token fornecido ou token malformado' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, secret);
        request.user = decoded;
        next();
    } catch (error) {
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
