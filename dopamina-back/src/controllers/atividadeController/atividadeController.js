const supabase = require('../../db/db');
const jwt = require('jsonwebtoken')

const criarAtividade = async (request, response) => {
    const { titulo, descricao, data, desafio_id, comentarios } = request.body;

    const token = request.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    const userId = decodedToken.userId;

    try {
        const { data: participante } = await supabase
            .from('participantes_desafios')
            .select('usuario_id')
            .eq('usuario_id', userId)
            .eq('desafio_id', desafio_id)
            .single();

        if (!participante) {
            return response.status(403).json({ error: 'Você não está cadastrado neste desafio.' });
        }
    } catch (error) {
        console.error('Erro ao verificar participação no desafio:', error);
        return response.status(500).json({ error: 'Erro interno do servidor.' });
    }

    if (!titulo || !descricao || !data || !desafio_id) {
        return response.status(400).json({ error: 'Por favor, preencha todos os campos obrigatórios.' });
    }

    try {
        const { data: atividade, error: insertError } = await supabase
            .from('atividades')
            .insert([{ titulo, descricao, data, usuario_id: userId, desafio_id }])
            .select()  
            .single();

        if (insertError) {
            console.error('Erro ao criar atividade: ', insertError);
            return response.status(400).json({ error: 'Erro ao criar a atividade.' });
        }

        if (comentarios && comentarios.length > 0) {
            const comentariosData = comentarios.map(conteudo => ({
                conteudo,
                usuario_id: userId,
                atividade_id: atividade.id,
                desafio_id: desafio_id
            }));

            const { error: comentarioError } = await supabase
                .from('comentarios')
                .insert(comentariosData);

            if (comentarioError) {
                console.error('Erro ao criar comentários: ', comentarioError);
                return response.status(400).json({ error: 'Erro ao criar comentários.' });
            }
        }

        response.status(201).json({ message: 'Atividade e comentários criados com sucesso', atividade });
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

const buscarAtividadeComComentarios = async (request, response) => {
    const id = request.params.id; 

    try {
        const { data: atividade, error: atividadeError } = await supabase
            .from('atividades')
            .select(`
                *,
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
            `)
            .eq('id', id)
            .single();

        if (atividadeError || !atividade) {
            console.log(atividadeError)
            return response.status(404).json({ error: 'Atividade não encontrada.' });
        }

        response.status(200).json({ atividade });
    } catch (error) {
        console.error('Erro ao buscar atividade com comentários: ', error);
        return response.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

const atualizarAtividade = async (request, response) => {
    const id = request.params.id;
    const { titulo, descricao, data, usuario_id, desafio_id } = request.body;

    try {
        const { data: atividadeExistente, error: verificaError } = await supabase
            .from('atividades')
            .select('*')
            .eq('id', id)
            .single();

        if (verificaError) {
            throw verificaError;
        }

        if (!atividadeExistente) {
            return response.status(404).json({ error: 'Atividade não encontrada' });
        }

        const { data: atividadeAtualizada, error: atualizaError } = await supabase
            .from('atividades')
            .update({ titulo, descricao, data, usuario_id, desafio_id })
            .eq('id', id)
            .select('*');  // Para retornar a atividade atualizada

        if (atualizaError) {
            throw atualizaError;
        }

        response.status(200).json({ message: 'Atividade atualizada com sucesso', atividade: atividadeAtualizada });
    } catch (error) {
        console.error('Erro ao atualizar atividade: ', error);
        return response.status(500).json({ error: 'Erro interno do servidor.' });
    }
};


const deletarAtividade = async (request, response) => {
    const id = request.params.id;

    try {
        // Verificar se a atividade existe
        const { data: atividadeExistente, error: verificaError } = await supabase
            .from('atividades')
            .select('*')
            .eq('id', id)
            .single();

        if (verificaError) {
            throw verificaError;
        }

        if (!atividadeExistente) {
            return response.status(404).json({ error: 'Atividade não encontrada' });
        }

        // Deletar comentários relacionados à atividade
        const { error: deletaComentariosError } = await supabase
            .from('comentarios')
            .delete()
            .eq('atividade_id', id);

        if (deletaComentariosError) {
            throw deletaComentariosError;
        }

        // Deletar a atividade
        const { data: atividadeDeletada, error: deletaAtividadeError } = await supabase
            .from('atividades')
            .delete()
            .eq('id', id)
            .select('*');  // Para retornar a atividade deletada

        if (deletaAtividadeError) {
            throw deletaAtividadeError;
        }

        response.status(200).json({ message: 'Atividade deletada com sucesso', atividade: atividadeDeletada });
    } catch (error) {
        console.error('Erro ao deletar atividade: ', error);
        return response.status(500).json({ error: 'Erro interno do servidor.' });
    }
};


module.exports = {
    criarAtividade,
    obterAtividade,
    buscarAtividadeComComentarios,
    atualizarAtividade,
    deletarAtividade
};
