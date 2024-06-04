const supabase = require('../../db/db');
const jwt = require('jsonwebtoken')

function verifyJWT(request, response, next) {
    const token = request.headers['authorization']
    jwt.verify(token, SECRET, (error, decoded) => {
        if(error) return response.status(401).end()
        
        request.userId = decoded.userId
        next
    })
}

// Função de login
const login = async (request, response) => {
    const { email, senha } = request.body;
    const campos = { email, senha };

    // Validação de campos
    for (const campo in campos) {
        if (!campos[campo]) {
            return response.status(400).json({ error: `Por favor, preencha o campo ${campo}` });
        }
    }

    try {
        // Consulta ao banco de dados para usuários
        const { data: usuario, error: errorUsuario } = await supabase
            .from('usuarios')
            .select('*')
            .eq('email', email)
            .single();

        // Consulta ao banco de dados para empresas
        const { data: empresa, error: errorEmpresa } = await supabase
            .from('empresas')
            .select('*')
            .eq('email', email)
            .single();

        // Verificação de credenciais
        if (usuario && usuario.senha === senha) {
            const token = jwt.sign({userId: usuario.id}, SECRET, {expiresIn: '1d' })
            return response.status(200).json({ message: 'Login realizado com sucesso', auth: true, token: token });
        } else if (empresa && empresa.senha === senha) {
            const token = jwt.sign({userId: empresa.id}, SECRET, {expiresIn: '1d' })
            return response.status(200).json({ message: 'Login realizado com sucesso', auth: true, token: token });
        } else {
            return response.status(401).json({ error: 'Credenciais inválidas' });
        }
    } catch (error) {
        console.error('Erro ao fazer login: ', error);
        return response.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    login
};
