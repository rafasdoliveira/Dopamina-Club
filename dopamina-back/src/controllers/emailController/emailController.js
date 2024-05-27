const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.USER_MAIL,
        pass: process.env.PASS_MAIL
    },
    tls: {
        rejectUnauthorized: false
    }
});

const emailBoasVindas = async ({ recipientEmail, recipientName }) => {
    try {
        await transport.sendMail({
            from: 'Dopamina Club <dopaminaclub@outlook.com>',
            to: recipientEmail,
            subject: 'DC | Criando hábitos saudáveis',
            html: `
                <div style="background-color: orange; padding: 20px; border-radius: 10px;">
                    <h1 style="color: white;">Seja bem-vindo ao Dopamina Club</h1>
                    <p style="color: black;">${recipientName}, estamos felizes por você fazer parte disso!</p>
                    <p style="color: black;">Estamos animados para embarcar nesta jornada de desenvolvimento de novos hábitos com você!</p>
                    <p style="color: black;">Com carinho,</p>
                    <p style="color: black;">A equipe Dopamina Club</p>
                </div>
            `
        });
        console.log('E-mail de boas-vindas enviado com sucesso!');
    } catch (error) {
        console.error(`Erro ao enviar e-mail de boas-vindas: ${error}`);
    }
};

module.exports = emailBoasVindas;
