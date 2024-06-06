const supabase = require('../../db/db');
const jwt = require('jsonwebtoken');

const criarComentario = async (request, response) => {
    const { conteudo, atividade_id } = request.body;

    const token = request.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    const userId = decodedToken.userId;

    const { data: atividade, error: atividadeError } = await supabase
        .from('atividades')
        .select('desafio_id')
        .eq('id', atividade_id)
        .single();

    if (atividadeError || !atividade) {
        return response.status(404).json({ error: 'Atividade não encontrada.' });
    }

    const desafio_id = atividade.desafio_id;

    const { data: comentario, error: insertError } = await supabase
        .from('comentarios')
        .insert([{ conteudo, usuario_id: userId, atividade_id, desafio_id }]);

    if (insertError) {
        console.error('Erro ao criar comentário: ', insertError);
        return response.status(400).json({ error: 'Erro ao criar o comentário.' });
    }

    response.status(201).json({ message: 'Comentário criado com sucesso', comentario });
};

const obterComentarios = async (request, response) => {
    const { atividade_id } = request.params;
    
    try {
        const { data: comentarios, error } = await supabase
            .from('comentarios')
            .select('*')
            .eq('id', atividade_id);

        if (error) {
            throw error;
        }

        response.status(200).json(comentarios);
    } catch (error) {
        console.error('Erro ao obter comentários: ', error);
        response.status(500).json({ error: 'Erro interno do servidor.' });
    }
};


const atualizarComentario = async (request, response) => {
    const { id } = request.params;
    const { conteudo } = request.body;

    const token = request.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    const userId = decodedToken.userId;

    try {
        const { data: comentario, error: buscaError } = await supabase
            .from('comentarios')
            .select('*')
            .eq('id', id)
            .single();

        if (buscaError) {
            throw buscaError;
        }

        if (!comentario) {
            return response.status(404).json({ error: 'Comentário não encontrado' });
        }

        if (comentario.usuario_id !== userId) {
            return response.status(403).json({ error: 'Usuário não autorizado' });
        }

        const { data: comentarioAtualizado, error: atualizaError } = await supabase
            .from('comentarios')
            .update({ conteudo })
            .eq('id', id)
            .select('*')
            .single();

        if (atualizaError) {
            throw atualizaError;
        }

        response.status(200).json({ message: 'Comentário atualizado com sucesso', comentario: comentarioAtualizado });
    } catch (error) {
        console.error('Erro ao atualizar comentário: ', error);
        response.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

const deletarComentario = async (request, response) => {
    const { id } = request.params;

    const token = request.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    const userId = decodedToken.userId;

    try {
        const { data: comentario, error: buscaError } = await supabase
            .from('comentarios')
            .select('*')
            .eq('id', id)
            .single();

        if (buscaError) {
            throw buscaError;
        }

        if (!comentario) {
            return response.status(404).json({ error: 'Comentário não encontrado' });
        }

        if (comentario.usuario_id !== userId) {
            return response.status(403).json({ error: 'Usuário não autorizado' });
        }

        const { data: comentarioDeletado, error: deletaError } = await supabase
            .from('comentarios')
            .delete()
            .eq('id', id)
            .select('*');

        if (deletaError) {
            throw deletaError;
        }

        response.status(200).json({ message: 'Comentário deletado com sucesso', comentario: comentarioDeletado });
    } catch (error) {
        console.error('Erro ao deletar comentário: ', error);
        response.status(500).json({ error: 'Erro interno do servidor.' });
    }
};


module.exports = {
    criarComentario,
    obterComentarios,
    atualizarComentario,
    deletarComentario
};
