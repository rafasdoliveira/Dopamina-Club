// Importações
const supabase = require('../../db/db');
const emailBoasVindas = require('../emailController/emailController');

// Função para criar usuário
const criarUsuario = async (request, response) => {
    const { nome, usuario, email, telefone, senha } = request.body;
    const campos = { nome, usuario, email, telefone, senha };

    // Validação de campos
    for (const campo in campos) {
        if (!campos[campo]) {
            return response.status(400).json({ error: `Por favor, preencha o campo ${campo}` });
        }
    }

    // Validação de senha
    if (senha.length < 8) {
        return response.status(400).json({ error: 'A senha precisa ter pelo menos  8 caracteres!' });
    }

    try {
        // Verificação de e-mail existente
        const { data: emailExistente, error: selectError } = await supabase
            .from('usuarios')
            .select('*')
            .eq('email', email);

        if (selectError) {
            throw selectError;
        }

        if (emailExistente && emailExistente.length > 0) {
            return response.status(409).json({ error: 'E-mail já cadastrado' });
        }

        // Inserção do usuário no banco de dados
        const { data, error: insiraError } = await supabase
            .from('usuarios')
            .insert([{ nome, usuario, email, telefone, senha }]);

        if (insiraError) {
            console.error('Erro ao criar usuário: ', insiraError);
            return response.status(400).json({ error: 'Internal Server Error' });
        }

        // Envio de e-mail de boas-vindas
        await emailBoasVindas({ recipientEmail: email, recipientName: nome });
        response.status(201).json({ message: 'Usuário criado com sucesso' });
    } catch (error) {
        console.error('Erro ao criar usuário: ', error);
        return response.status(500).json({ error: 'Internal Server Error' });
    }
};

// Exportações
module.exports = {
    criarUsuario
};
