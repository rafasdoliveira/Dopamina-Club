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

const obterUsuario = async (request, response) => {
    const { id } = request.params;

    try {
        const { data: usuario, error } = await supabase
            .from('usuarios')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            throw error;
        }

        if (!usuario) {
            return response.status(404).json({ error: 'Usuário não encontrado' });
        }

        response.status(200).json(usuario);
    } catch (error) {
        console.error('Erro ao obter usuário: ', error);
        return response.status(500).json({ error: 'Internal Server Error' });
    }
};

// Função para atualizar usuário por ID
const atualizarUsuario = async (request, response) => {
    const { id } = request.params;
    const { nome, usuario, email, telefone, senha } = request.body;

    try {
        const { data, error } = await supabase
            .from('usuarios')
            .update({ nome, usuario, email, telefone, senha })
            .eq('id', id);

        if (error) {
            throw error;
        }

        if (data.length === 0) {
            return response.status(404).json({ error: 'Usuário não encontrado' });
        }

        response.status(200).json({ message: 'Usuário atualizado com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar usuário: ', error);
        return response.status(500).json({ error: 'Internal Server Error' });
    }
};

// Função para deletar usuário por ID
const deletarUsuario = async (request, response) => {
    const { id } = request.params;

    try {
        const { data, error } = await supabase
            .from('usuarios')
            .delete()
            .eq('id', id);

        if (error) {
            throw error;
        }

        if (data.length === 0) {
            return response.status(404).json({ error: 'Usuário não encontrado' });
        }

        response.status(200).json({ message: 'Usuário deletado com sucesso' });
    } catch (error) {
        console.error('Erro ao deletar usuário: ', error);
        return response.status(500).json({ error: 'Internal Server Error' });
    }
};

// Exportações
module.exports = {
    criarUsuario,
    obterUsuario,
    atualizarUsuario,
    deletarUsuario
};
