const supabase = require('../../db/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const secret = process.env.SECRET_TOKEN;

const login = async (request, response) => {
    const { email, senha } = request.body;
    const campos = { email, senha };

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

        // Verifica se o e-mail existe
        if (usuario) {
            // Verifica a senha
            if (bcrypt.compareSync(senha, usuario.senha)) {
                const token = jwt.sign({ userId: usuario.id, tipo: 'usuario' }, secret, { expiresIn: '1d' });
                return response.status(200).json({ message: 'Login realizado com sucesso', auth: true, token });
            } else {
                return response.status(401).json({ error: 'Senha incorreta' });
            }
        } else if (empresa) {
            // Verifica a senha
            if (bcrypt.compareSync(senha, empresa.senha)) {
                const token = jwt.sign({ userId: empresa.id, tipo: 'empresa' }, secret, { expiresIn: '1d' });
                return response.status(200).json({ message: 'Login realizado com sucesso', auth: true, token });
            } else {
                return response.status(401).json({ error: 'Senha incorreta' });
            }
        } else {
            return response.status(404).json({ error: 'E-mail não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao fazer login: ', error);
        return response.status(500).json({ error: 'Erro interno do servidor' });
    }
};

module.exports = {
    login
};
