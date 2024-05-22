const express = require('express') 
const app = express()
const port = 8081
const { createClient } = require('@supabase/supabase-js')
const env = require('dotenv').config()
const cors = require('cors')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')


const url = process.env.URL
const apiKey = process.env.API_KEY
const supabase = createClient(url, apiKey)

app.use(cors())
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
    extended: true
    })
)

app.get('/', (request, response) => {
    response.json({info: 'Nodejs, Express and Supabase API'})
})

const home = (request, response) => {
    response.sendFile('index.html', { root: __dirname })
}

const helloworld = (request, response) => {
    response.send('<h1>Hello World!</h1>\n<p>Olá mundo! A aplicação Dopamina Back está rodando!</p>')
}

// Envio de e-mail
const transport = nodemailer.createTransport ({
    host: 'smtp-mail.outlook.com',
    port: 587, 
    secure: false,
    auth: {
        user: process.env.USER_MAIL, 
        pass: process.env.PASS_MAIL
    }
})

const sendConfirmationEmail = async ({recipientEmail, recipientName}) => {
    try {
        await transport.sendMail({
            from: 'Dopamina Club <dopaminaclub@outlook.com>',
            to: recipientEmail,
            subject: 'Enviando e-mail com NodeMailer',
            html: `<h1>Seja bem vindo ao Dopamina Club</h1> <p>${recipientName}, estamos felizes por você parte disso!</p>`,
        })
        
        console.log('Enviado com sucesso!')
    }
    catch (error) {
        console.log(error)
    }
}

// Criando usuário
const createusuario = async (request, response) => {
    const { nome, usuario, email, telefone, senha } = request.body;
    const campos = { nome, usuario, email, telefone, senha };

    for (const campo in campos) {
        if (!campos[campo]) {
            return response.status(400).json({ error: `Por favor, preencha o campo ${campo}` });
        }
    }

    if(senha.length < 8) {
        return response.status(400).json({error: `A senha precisa ter pelo menos 8 caracteres!`})
    }

    try {

        const { data: emailExistente, error } = await supabase
           .from("usuarios")
           .select("*")
           .eq("email", email)

            if(emailExistente && emailExistente.length > 0) {
                return response.status(409).json({error: 'E-mail já cadastrado'})
            }

            const { data, error: insiraError } = await supabase
           .from("usuarios")
           .insert([{ nome, email, telefone, senha }]);
           
            if (insiraError) {
                console.error('Erro ao criar usuário: ', error);
                return response.status(400).json({ error: 'Internal Server Error' });
            }

            await sendConfirmationEmail({recipientEmail: email, recipientName: nome})
            response.status(201).json({ message: 'Usuário criado com sucesso' });
       
      
    } catch (error) {
        console.error('Erro ao criar usuário: ', error);
        return response.status(500).json({ error: 'Internal Server Error' });
    }
};

// Criando empresa
const createempresa = async (request, response) => {
    const { nome_fantasia, email, telefone, cnpj, senha } = request.body

    const campos = { nome_fantasia, email, telefone, senha };

    for (const campo in campos) {
        if (!campos[campo]) {
            return response.status(400).json({ error: `Por favor, preencha o campo ${campo}` });
        }
    }

    if(senha.length < 8) {
        return response.status(400).json({error: `A senha precisa ter pelo menos 8 caracteres!`})
    }

    if(cnpj.length < 14) {
        return response.status(400).json({error: `O CNPJ digitado não segue os padrões de um CNPJ!`})
    }

    try {

        const { data: emailExistente, error } = await supabase
        .from("empresas")
        .select("*")
        .eq("email", email)

         if(emailExistente && emailExistente.length > 0) {
             return response.status(400).json({error: 'E-mail já cadastrado'})
         }

         const { data: cnpjExistente, error: errorCnpj } = await supabase
         .from("empresas")
         .select("*")
         .eq("cnpj", cnpj)
 
         if(cnpjExistente && cnpjExistente.length > 0) {
            return response.status(400).json({error: 'CNPJ já cadastrado'})
        }

        const { data, error: insiraError } = await supabase
            .from("empresas")
            .insert([{ nome_fantasia, email, telefone, cnpj, senha }])

            if (insiraError) {
                console.error('Erro ao criar usuário: ', error);
                return response.status(500).json({ error: 'Internal Server Error' });
            }

            response.status(201).json({message: 'Empresa cadastrada com sucesso'})
            console.log({ data })
    }
    catch (error) {
        console.error('Erro ao criar usuário: ', error)
        return response.status(500).json({ error: 'Internal Server Error' })
    }
}

//login

const login = async (request, response) => {
    const { email, senha } = request.body;

    const campos = { email, senha };

    for (const campo in campos) {
        if (!campos[campo]) {
            return response.status(400).json({ error: `Por favor, preencha o campo ${campo}` });
        }
    }

    try {
        const { data: usuario, error: errorUsuario } = await supabase
            .from('usuarios')
            .select('*')
            .eq('email', email)
            .single();

        const { data: empresa, error: errorEmpresa } = await supabase
            .from('empresas')
            .select('*')
            .eq('email', email)
            .single();

        if (usuario && usuario.senha === senha) {
            return response.status(200).json({ message: 'Login realizado com sucesso' });
        } else if (empresa && empresa.senha === senha) {
            return response.status(200).json({ message: 'Login realizado com sucesso' });
        } else {
            return response.status(401).json({ error: 'Credenciais inválidas' });
        }
    } catch (error) {
        console.error('Erro ao fazer login: ', error);
        return response.status(500).json({ error: 'Internal Server Error' });
    }
};


// Rotas Globais
app.get('/home', home)
app.get('/helloworld', helloworld)
// Usuários
app.post('/usuarios', createusuario)
// Empresas
app.post('/empresas', createempresa)

app.post('/login', login)

app.listen(port, () => {
    console.log(`Aplicação rodando na porta: ${port}`)
})