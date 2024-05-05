const supabase = require('../../db/db')

const create = async (request, response) => {
    const { nome, email, telefone, senha } = request.body

    try {
        const { data, error } = await supabase
            // select * from("usuarios")
            `INSERT INTO 
                public.usuarios 
                ( 
                    nome, 
                    email, 
                    telefone, 
                    senha 
                )
                VALUES (
                    '${req.body.name}'
                    '${req.body.email}'
                    '${req.body.telefone}'
                    '${req.body.senha}'
                ) 
                ` 
            if(error) {
                console.error('Erro ao criar usuário: ', error)
                return response.status(500).json({ error: 'Internal Server Error' })
            }

            response.status(201).json
            console.log({ data })
    }
    catch (error) {
        console.error('Erro ao criar usuário: ', error)
        return response.status(500).json({ error: 'Internal Server Error' })
    }
}

module.exports = {
    create
}