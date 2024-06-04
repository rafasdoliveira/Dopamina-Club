const jwt = require('jsonwebtoken')
const secret = process.env.SECRET_TOKEN

const authMiddleware = (request, response, next) => {
    const token = req.header('Authorization')

    if (!token) {
        return response.status(401).json({ message: 'Acesso negado. Nenhum token fornecido'})
    }

    try {
        const decoded = jwt.verify(token, secret)
        request.user = decoded 
        next()
    } catch (error) {
        response.status(400).json({ message: 'Token inválido' })
    }
}

module.exports = {
    authMiddleware
}