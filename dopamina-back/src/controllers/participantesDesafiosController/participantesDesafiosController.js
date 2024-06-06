const supabase = require('../../db/db');
const jwt = require('jsonwebtoken');

const entrarNoDesafio = async (request, response) => {
    const { desafio_id }= request.body;
    const token = request.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    const userId = decodedToken.userId;

    console.log(userId)
    console.log(desafio_id)

    try {
        const { data: desafioExistente, error: verificaDesafioError } = await supabase
            .from('desafios')
            .select('*')
            .eq('id', desafio_id)
            .single();

            if (!desafioExistente) {
                return response.status(404).json({ error: 'Desafio não encontrado' });
            }
  
            if (verificaDesafioError) {
            console.error('Erro ao verificar desafio: ', verificaDesafioError);
            return response.status(500).json({ error: 'Erro interno do servidor' });
            }


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



const sairDoDesafio = async (request, response) => {
    const desafio_id = request.params.id;
    const token = request.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    const userId = decodedToken.userId;

    try {
        // Verificar se o usuário está participando deste desafio
        const { data: participante, error: buscaParticipanteError } = await supabase
            .from('participantes_desafios')
            .select('*')
            .eq('desafio_id', desafio_id)
            .eq('usuario_id', userId)
            .single();

        if (buscaParticipanteError) {
            console.error('Erro ao buscar participante do desafio: ', buscaParticipanteError);
            return response.status(500).json({ error: 'Erro interno do servidor' });
        }

        if (!participante) {
            return response.status(404).json({ error: 'Usuário não está participando deste desafio' });
        }

        // Remover o participante do desafio
        const { error: removeParticipanteError } = await supabase
            .from('participantes_desafios')
            .delete()
            .eq('desafio_id', desafio_id)
            .eq('usuario_id', userId);

        if (removeParticipanteError) {
            console.error('Erro ao remover participante do desafio: ', removeParticipanteError);
            return response.status(500).json({ error: 'Erro interno do servidor' });
        }

        response.status(200).json({ message: 'Usuário saiu do desafio com sucesso' });
    } catch (error) {
        console.error('Erro ao sair do desafio: ', error);
        return response.status(500).json({ error: 'Erro interno do servidor' });
    }
};

module.exports = {
    entrarNoDesafio,
    sairDoDesafio
}