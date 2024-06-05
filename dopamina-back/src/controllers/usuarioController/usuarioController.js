const supabase = require('../../db/db');
const emailBoasVindas = require('../emailController/emailController');
const bcrypt = require('bcryptjs');

const criarUsuario = async (request, response) => {
    const { nome, usuario, email, telefone, senha } = request.body;
    const campos = { nome, usuario, email, telefone, senha };

    for (const campo in campos) {
        if (!campos[campo]) {
            return response.status(400).json({ error: `Por favor, preencha o campo ${campo}` });
        }
    }

    if (senha.length < 8) {
        return response.status(400).json({ error: 'A senha precisa ter pelo menos 8 caracteres!' });
    }

    try {
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

        const hashedSenha = bcrypt.hashSync(senha, 10);

        const { data, error: insiraError } = await supabase
            .from('usuarios')
            .insert([{ nome, usuario, email, telefone, senha: hashedSenha }]);

        if (insiraError) {
            console.error('Erro ao criar usuário: ', insiraError);
            return response.status(400).json({ error: 'Erro ao criar usuário' });
        }

        await emailBoasVindas({ recipientEmail: email, recipientName: nome });
        response.status(201).json({ message: 'Usuário criado com sucesso' });
    } catch (error) {
        console.error('Erro ao criar usuário: ', error);
        return response.status(500).json({ error: 'Erro interno do servidor' });
    }
};

const obterUsuario = async (request, response) => {
    const userId = request.user.userId; 

    try {
        const { data: usuario, error } = await supabase
            .from('usuarios')
            .select('*')
            .eq('id', userId)
            .single();

        if (error) {
            throw error;
        }

        if (!usuario) {
            return response.status(404).json({ error: 'Usuário não encontrado' });
        }

        response.status(200).json(usuario);
    } catch (error) {
        console.error('Erro ao obter dados do usuário: ', error);
        response.status(500).json({ error: 'Erro interno do servidor' });
    }
};

const atualizarUsuario = async (request, response) => {
    const userId = request.user.userId; 
    console.log('user do token', userId)

    const { id } = request.params;
    console.log('user do banco', id)
    
    const { nome, usuario, email, telefone, senha } = request.body;
    
    const atualizacoes = { nome, usuario, email, telefone };

    if (senha) {
        atualizacoes.senha = bcrypt.hashSync(senha, 10);
    }

    try {
        if (userId !== id) {
            return response.status(403).json({ error: 'Você não tem permissão para atualizar este usuário' });
        }

        const { data, error } = await supabase
            .from('usuarios')
            .update(atualizacoes)
            .eq('id', id);

        if (error) {
            throw error;
        }

        if (!data || data.length === 0) {
            return response.status(404).json({ error: 'Usuário não encontrado' });
        }

        response.status(200).json({ message: 'Usuário atualizado com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar usuário: ', error);
        return response.status(500).json({ error: 'Erro interno do servidor' });
    }
};

const deletarUsuario = async (request, response) => {
    const userId = request.user.userId; 
    console.log('idtoken', userId )
    
    const { id } = request.params;
    console.log('idbanco', id )

    try {
        if (userId !== id) {
            return response.status(403).json({ error: 'Você não tem permissão para excluir este usuário' });
        }

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
        return response.status(500).json({ error: 'Erro interno do servidor' });
    }
};

module.exports = {
    criarUsuario,
    obterUsuario,
    atualizarUsuario,
    deletarUsuario
};
