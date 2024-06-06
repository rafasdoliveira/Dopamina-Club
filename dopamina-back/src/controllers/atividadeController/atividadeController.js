const supabase = require('../../db/db');
const jwt = require('jsonwebtoken')

const criarAtividade = async (request, response) => {
    const { titulo, descricao, data, desafio_id } = request.body;

    const token = request.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    const userId = decodedToken.userId;

      // Verificar se o usuário está cadastrado no desafio
      try {
        const { data: participante } = await supabase
            .from('participantes_desafios')
            .select('usuario_id')
            .eq('usuario_id', userId)
            .eq('desafio_id', desafio_id)
            .single();

        // Se o usuário não estiver cadastrado no desafio, retornar um erro
        if (!participante) {
            return response.status(403).json({ error: 'Você não está cadastrado neste desafio.' });
        }
    } catch (error) {
        console.error('Erro ao verificar participação no desafio:', error);
        return response.status(500).json({ error: 'Erro interno do servidor.' });
    }


    // Verificando se os campos obrigatórios estão presentes
    if (!titulo || !descricao || !data || !desafio_id) {
        return response.status(400).json({ error: 'Por favor, preencha todos os campos obrigatórios.' });
    }

    try {
        const { data: atividade, error: insertError } = await supabase
            .from('atividades')
            .insert([{ titulo, descricao, data, usuario_id: userId, desafio_id }]);

        if (insertError) {
            console.error('Erro ao criar atividade: ', insertError);
            return response.status(400).json({ error: 'Erro ao criar a atividade.' });
        }

        response.status(201).json({ message: 'Atividade criada com sucesso', atividade });
    } catch (error) {
        console.error('Erro ao criar atividade: ', error);
        return response.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

const obterAtividade = async (request, response) => {
    const { id } = request.params;

    try {
        const { data: atividade, error } = await supabase
            .from('atividades')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            throw error;
        }

        if (!atividade) {
            return response.status(404).json({ error: 'Atividade não encontrada' });
        }

        response.status(200).json(atividade);
    } catch (error) {
        console.error('Erro ao obter atividade: ', error);
        return response.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

const atualizarAtividade = async (request, response) => {
    const { id } = request.params;
    const { titulo, descricao, data, usuario_id, desafio_id } = request.body;

    try {
        const { data: atividade, error } = await supabase
            .from('atividades')
            .update({ titulo, descricao, data, usuario_id, desafio_id })
            .eq('id', id);

        if (error) {
            throw error;
        }

        if (!atividade) {
            return response.status(404).json({ error: 'Atividade não encontrada' });
        }

        response.status(200).json({ message: 'Atividade atualizada com sucesso', atividade });
    } catch (error) {
        console.error('Erro ao atualizar atividade: ', error);
        return response.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

const deletarAtividade = async (request, response) => {
    const { id } = request.params;

    try {
        const { data: atividade, error } = await supabase
            .from('atividades')
            .delete()
            .eq('id', id);

        if (error) {
            throw error;
        }

        if (!atividade) {
            return response.status(404).json({ error: 'Atividade não encontrada' });
        }

        response.status(200).json({ message: 'Atividade deletada com sucesso' });
    } catch (error) {
        console.error('Erro ao deletar atividade: ', error);
        return response.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

module.exports = {
    criarAtividade,
    obterAtividade,
    atualizarAtividade,
    deletarAtividade
};
