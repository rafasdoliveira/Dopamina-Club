const supabase = require('../../db/db');

const criarDesafio = async (request, response) => {
    const { titulo, data_inicial, data_final, tipo, descricao } = request.body;
    const campos = { titulo, data_inicial, data_final, tipo, descricao };

    for (const campo in campos) {
        if (!campos[campo]) {
            return response.status(400).json({ error: `Por favor, preencha o campo ${campo}` });
        }
    }

    try {
        const { data, error: insiraError } = await supabase
            .from('desafios')
            .insert([{ titulo, data_inicial, data_final, tipo, descricao }]);

        if (insiraError) {
            console.error('Erro ao criar desafio: ', insiraError);
            return response.status(400).json({ error: 'Internal Server Error' });
        }

        response.status(201).json({ message: 'Desafio criado com sucesso' });
    } catch (error) {
        console.error('Erro ao criar desafio: ', error);
        return response.status(500).json({ error: 'Internal Server Error' });
    }
};

const obterDesafio = async (request, response) => {
    const { id } = request.params;

    try {
        const { data: desafio, error } = await supabase
            .from('desafios')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            throw error;
        }

        if (!desafio) {
            return response.status(404).json({ error: 'Desafio não encontrado' });
        }

        response.status(200).json(desafio);
    } catch (error) {
        console.error('Erro ao obter desafio: ', error);
        return response.status(500).json({ error: 'Internal Server Error' });
    }
};

const atualizarDesafio = async (request, response) => {
    const { id } = request.params;
    const { titulo, data_inicial, data_final, tipo, descricao } = request.body;

    try {
        const { data, error } = await supabase
            .from('desafios')
            .update({ titulo, data_inicial, data_final, tipo, descricao })
            .eq('id', id);

        if (error) {
            throw error;
        }

        if (data.length === 0) {
            return response.status(404).json({ error: 'Desafio não encontrado' });
        }

        response.status(200).json({ message: 'Desafio atualizado com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar desafio: ', error);
        return response.status(500).json({ error: 'Internal Server Error' });
    }
};

const deletarDesafio = async (request, response) => {
    const { id } = request.params;

    try {
        const { data, error } = await supabase
            .from('desafios')
            .delete()
            .eq('id', id);

        if (error) {
            throw error;
        }

        if (data.length === 0) {
            return response.status(404).json({ error: 'Desafio não encontrado' });
        }

        response.status(200).json({ message: 'Desafio deletado com sucesso' });
    } catch (error) {
        console.error('Erro ao deletar desafio: ', error);
        return response.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    criarDesafio,
    obterDesafio,
    atualizarDesafio,
    deletarDesafio
};
