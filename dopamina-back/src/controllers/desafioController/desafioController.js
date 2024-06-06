const supabase = require('../../db/db');
const jwt = require('jsonwebtoken');

const criarDesafio = async (request, response) => {
    const { titulo, data_inicial, data_final, descricao } = request.body;
    const campos = { titulo, data_inicial, data_final, descricao };

    // Obtém o ID do usuário a partir do token de autenticação
    const token = request.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    const userId = decodedToken.userId;

    for (const campo in campos) {
        if (!campos[campo]) {
            return response.status(400).json({ error: `Por favor, preencha o campo ${campo}` });
        }
    }

    try {
        // Insere o desafio no banco de dados
        const { data: desafio, error: insiraError } = await supabase
            .from('desafios')
            .insert([{ titulo, data_inicial, data_final, descricao, criado_por: userId }]);

        if (insiraError) {
            console.error('Erro ao criar desafio: ', insiraError);
            return response.status(400).json({ error: 'Erro ao criar desafio' });
        }

        response.status(201).json({ message: 'Desafio criado com sucesso' });
    } catch (error) {
        console.error('Erro ao criar desafio: ', error);
        return response.status(500).json({ error: 'Erro interno do servidor' });
    }
};

const entrarNoDesafio = async (request, response) => {
    const { desafio_id } = request.body;
    const token = request.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    const userId = decodedToken.userId;

    try {
        // Verifica se o usuário já está participando do desafio
        const { data: participanteExistente, error: verificaParticipanteError } = await supabase
            .from('participantes_desafios')
            .select('*')
            .eq('desafio_id', desafio_id)
            .eq('usuario_id', userId);

        if (verificaParticipanteError) {
            console.error('Erro ao verificar participante: ', verificaParticipanteError);
            return response.status(500).json({ error: 'Erro interno do servidor' });
        }

        if (participanteExistente.length > 0) {
            return response.status(409).json({ error: 'Usuário já está participando deste desafio' });
        }

        // Insere o usuário como participante
        const { data: novoParticipante, error: insereParticipanteError } = await supabase
            .from('participantes_desafios')
            .insert([{ desafio_id, usuario_id: userId }]);

        if (insereParticipanteError) {
            console.error('Erro ao adicionar participante: ', insereParticipanteError);
            return response.status(500).json({ error: 'Erro interno do servidor' });
        }

        response.status(201).json({ message: 'Usuário entrou no desafio com sucesso' });
    } catch (error) {
        console.error('Erro ao entrar no desafio: ', error);
        return response.status(500).json({ error: 'Erro interno do servidor' });
    }
};

const obterDesafio = async (request, response) => {
    console.log('chamou obter desafio')
    const token = request.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    const userId = decodedToken.userId;

    try {
        const { data: desafio, error } = await supabase
            .from('desafios')
            .select('*')
            .eq('criado_por', userId)

        if (error) {
            console.error('Erro ao obter desafio: ', error);
            return response.status(500).json({ error: 'Erro interno do servidor' });
        }

        if (!desafio) {
            return response.status(404).json({ error: 'Desafio não encontrado' });
        }

        const desafiosEnumerados = desafio.map((desafio, index) => ({
            index: index + 1,
            ...desafio
        }));

        response.status(200).json({ desafiosEnumerados });
    } catch (error) {
        console.error('Erro ao obter desafio: ', error);
        return response.status(500).json({ error: 'Erro interno do servidor' });
    }
};

const obterTodosDesafios = async (request, response) => {
    try {
        const { data: desafios, error } = await supabase
            .from('desafios')
            .select('*');

        if (error) {
            console.error('Erro ao obter desafios: ', error);
            return response.status(500).json({ error: 'Erro interno do servidor' });
        }

        const desafiosEnumerados = desafios.map((desafio, index) => ({
            index: index + 1,
            ...desafio
        }));

        response.status(200).json({ desafiosEnumerados });
    } catch (error) {
        console.error('Erro ao obter desafios: ', error);
        return response.status(500).json({ error: 'Erro interno do servidor' });
    }
};

const atualizarDesafio = async (request, response) => {
    // Lógica para atualizar um desafio existente
};

const deletarDesafio = async (request, response) => {
    const desafio_id  = request.params.id;
    const token = request.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    const userId = decodedToken.userId;

    try {
        const { data: desafio, error: buscaError } = await supabase
            .from('desafios')
            .select('*')
            .eq('id', desafio_id)
            .eq('criado_por', userId)
            // .single();

        console.log({desafio_id})
        console.log({buscaError})

        if (buscaError) {
            console.error('Erro ao buscar desafio: ', buscaError);
            return response.status(500).json({ error: 'Erro interno do servidor' });
        }

        if (!desafio) {
            return response.status(404).json({ error: 'Desafio não encontrado ou não autorizado' });
        }

        const { error: deletaError } = await supabase
            .from('desafios')
            .delete()
            .eq('id', desafio_id);

        if (deletaError) {
            console.error('Erro ao deletar desafio: ', deletaError);
            return response.status(500).json({ error: 'Erro interno do servidor' });
        }

        response.status(200).json({ message: 'Desafio deletado com sucesso' });
    } catch (error) {
        console.error('Erro ao deletar desafio: ', error);
        return response.status(500).json({ error: 'Erro interno do servidor' });
    }
};

module.exports = {
    criarDesafio,
    entrarNoDesafio,
    obterDesafio,
    obterTodosDesafios,
    atualizarDesafio,
    deletarDesafio
};
