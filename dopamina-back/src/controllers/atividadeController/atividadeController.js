const supabase = require('../../db/db')

const criarAtividade = async (request, response) => {
    const { titulo, descricao, data, atividade_realizada } = request.body
    const campos = { titulo, descricao, data, atividade_realizada }

    for (const campo in campos) {
        if (!campos[campo]) {
            return response.status(400).json({ error: `Por favor, preencha o campo ${campo}` });
        }
    }

    try {
        const { data, error: insiraError } = await supabase
            .from('atividades')
            .insert([{ titulo, descricao, data, atividade_realizada }]);

        if (insiraError) {
            console.error('Erro ao criar atividade: ', insiraError);
            return response.status(400).json({ error: 'Internal Server Error' });
        }

        response.status(201).json({ message: 'atividade criado com sucesso' });
    } catch (error) {
        console.error('Erro ao criar atividade: ', error);
        return response.status(500).json({ error: 'Internal Server Error' });
    }
}

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
        return response.status(500).json({ error: 'Internal Server Error' });
    }
};

const atualizarAtividade = async (request, response) => {
    const { id } = request.params;
    const { titulo, descricao, data, atividade_realizada } = request.body;

    try {
        const { data, error } = await supabase
            .from('atividades')
            .update({ titulo, descricao, data, atividade_realizada })
            .eq('id', id);

        if (error) {
            throw error;
        }

        if (data.length === 0) {
            return response.status(404).json({ error: 'Atividade não encontrada' });
        }

        response.status(200).json({ message: 'Atividade atualizada com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar atividade: ', error);
        return response.status(500).json({ error: 'Internal Server Error' });
    }
};

const deletarAtividade = async (request, response) => {
    const { id } = request.params;

    try {
        const { data, error } = await supabase
            .from('atividades')
            .delete()
            .eq('id', id);

        if (error) {
            throw error;
        }

        if (data.length === 0) {
            return response.status(404).json({ error: 'Atividade não encontrada' });
        }

        response.status(200).json({ message: 'Atividade deletada com sucesso' });
    } catch (error) {
        console.error('Erro ao deletar atividade: ', error);
        return response.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    criarAtividade, 
    obterAtividade,
    atualizarAtividade,
    deletarAtividade
}