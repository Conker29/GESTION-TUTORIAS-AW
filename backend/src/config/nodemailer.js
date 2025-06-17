import nodemailer from "nodemailer"
import dotenv from 'dotenv'
dotenv.config()


let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: process.env.HOST_MAILTRAP,
    port: process.env.PORT_MAILTRAP,
    auth: {
        user: process.env.USER_MAILTRAP,
        pass: process.env.PASS_MAILTRAP,
    }
});

const sendMailToRegister = (userMail, token) => {

    let mailOptions = {
        from: 'tutorias.esfot@gmail.com',
        to: userMail,
        subject: "CONFIRMACION DE CUENTA",
        html: `<p>Bienvenido a la plataforma! ... <a href="${process.env.URL_FRONTEND}confirm/${token}">Haz clic aquí</a> para confirmar tu cuenta.</p>
        <hr>
        <footer>2025 - Todos los derechos reservados.</footer>
        `
    }

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log("Mensaje enviado satisfactoriamente: ", info.messageId);
        }
    })
}

const sendMailToRecoveryPassword = async(userMail,token)=>{
    let info = await transporter.sendMail({
    from: 'tutorias.esfot@gmail.com',
    to: userMail,
    subject: "Correo para restablecer tu contraseña",
    html: `
    <h1>PLATAFORMA DE GESTION DE TUTORIAS😎</h1>
    <hr>
    <a href=${process.env.URL_FRONTEND}reset/${token}>Haz clic para reestablecer tu contraseña</a>
    <hr>
    <footer>2025 - TUTORIAS ESFOT - Todos los derechos reservados.</footer>
    `
    });
    console.log("Mensaje enviado satisfactoriamente: ", info.messageId);
}



export {
    sendMailToRegister,
    sendMailToRecoveryPassword
}
