const supabase = require('../../db/db');
const jwt = require('jsonwebtoken');

const criarDesafio = async (request, response) => {
    const { titulo, data_inicial, data_final, descricao, tipo } = request.body;
    const campos = { titulo, data_inicial, data_final, descricao, tipo };

    const token = request.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    const userId = decodedToken.userId;

    for (const campo in campos) {
        if (!campos[campo]) {
            return response.status(400).json({ error: `Por favor, preencha o campo ${campo}` });
        }
    }

    try {
        const { data: desafio, error: insiraError } = await supabase
            .from('desafios')
            .insert([{ titulo, data_inicial, data_final, descricao, tipo, criado_por: userId }]);

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

const obterDesafio = async (request, response) => {
    const token = request.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    const userId = decodedToken.userId;

    try {
        const { data: desafio, error } = await supabase
            .from('desafios')
            .select('*, criado_por(nome, email)')
            .eq('criado_por', userId);

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
            .select('*, criado_por(nome, email)');

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

const obterDesafiosAtividadesComentarios = async (request, response) => {
    console.log('chamou')
    const id = request.params.id
    console.log(id)

    try {
        const { data: desafios, error: desafioError } = await supabase
            .from('desafios')
            .select(`
            *,
            atividades (
                id, 
                titulo,
                descricao,
                data,
                comentarios (
                    id,
                    conteudo,
                    data,
                    usuario_id,
                    atividade_id,
                    usuarios (
                        id,
                        nome,
                        email
                    )
                )
            )
        `)
        .eq('id', id);

        if (desafioError) {
            console.error('Erro ao obter desafios: ', desafioError);
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
    const desafio_id  = request.params.id;
    const token = request.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    const userId = decodedToken.userId;

    const { titulo, data_inicial, data_final, descricao } = request.body;
    const atualizacoes = { titulo, data_inicial, data_final, descricao }

    try {
        const { data: existingDesafio, error: checkError } = await supabase
            .from('desafios')
            .select('id, criado_por')
            .eq('id', desafio_id)
            .single()

        if (checkError || !existingDesafio) {
            console.error('Desafio não encontrado:', checkError);
            return response.status(404).json({ error: 'Desafio não encontrado' });
        }

        if (existingDesafio.criado_por !== userId) {
            return response.status(403).json({ error: "Você não tem permissão para editar este desafio." })
        }

        const { data, error } = await supabase
            .from('desafios')
            .update(atualizacoes)
            .eq('id', desafio_id);

            if(error) {
                throw error
            }

            response.status(200).json({ message: 'Desafio atualizado com sucesso' })

    } catch (error) {
        console.error('')
    }
};




const deletarDesafio = async (request, response) => {
    const desafio_id = request.params.id;
    const token = request.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    const userId = decodedToken.userId;

    try {
        const { data: desafio, error: buscaError } = await supabase
            .from('desafios')
            .select('*')
            .eq('id', desafio_id)
            .eq('criado_por', userId)

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
    obterDesafio,
    obterTodosDesafios,
    obterDesafiosAtividadesComentarios,
    atualizarDesafio,
    deletarDesafio
};
