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

module.exports = {
    criarComentario
    // Adicione outras funções aqui
};
