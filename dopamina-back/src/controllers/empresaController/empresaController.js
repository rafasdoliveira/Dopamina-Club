// Importações
const supabase = require('../../db/db');
const emailBoasVindas = require('../emailController/emailController');

// Função para criar empresa
const criarEmpresa = async (request, response) => {
    const { nome_fantasia, usuario, email, telefone, cnpj, senha } = request.body;
    const campos = { nome_fantasia, usuario, email, telefone, senha };

    // Validação de campos
    for (const campo in campos) {
        if (!campos[campo]) {
            return response.status(400).json({ error: `Por favor, preencha o campo ${campo}` });
        }
    }

    // Validação de senha e CNPJ
    if (senha.length < 8) {
        return response.status(400).json({ error: 'A senha precisa ter pelo menos 8 caracteres!' });
    }

    if (cnpj.length < 14) {
        return response.status(400).json({ error: 'O CNPJ digitado não segue os padrões de um CNPJ!' });
    }

    try {
        // Verificação de e-mail existente
        const { data: emailExistente, error: selectError } = await supabase
            .from('empresas')
            .select('*')
            .eq('email', email);

        if (selectError) {
            console.error('Erro ao verificar e-mail existente: ', selectError);
            throw selectError;
        }

        if (emailExistente && emailExistente.length > 0) {
            return response.status(400).json({ error: 'E-mail já cadastrado' });
        }

        // Verificação de CNPJ existente
        const { data: cnpjExistente, error: errorCnpj } = await supabase
            .from('empresas')
            .select('*')
            .eq('cnpj', cnpj);

        if (errorCnpj) {
            console.error('Erro ao verificar CNPJ existente: ', errorCnpj);
            throw errorCnpj;
        }

        if (cnpjExistente && cnpjExistente.length > 0) {
            return response.status(400).json({ error: 'CNPJ já cadastrado' });
        }

        // Inserção da empresa no banco de dados
        const { data, error: insiraError } = await supabase
            .from('empresas')
            .insert([{ nome_fantasia, email, telefone, cnpj, senha }]);

        if (insiraError) {
            console.error('Erro ao criar empresa: ', insiraError);
            throw insiraError;
        }

        // Envio de e-mail de boas-vindas
        await emailBoasVindas({ recipientEmail: email, recipientName: nome_fantasia });
        response.status(201).json({ message: 'Empresa cadastrada com sucesso' });
        console.log('Empresa criada com sucesso:', data);
    } catch (error) {
        console.error('Erro ao criar empresa: ', error);
        return response.status(500).json({ error: 'Internal Server Error' });
    }
};


// Exportações
module.exports = {
    criarEmpresa
};