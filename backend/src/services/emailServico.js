const nodemailer = require("nodemailer");

const mailer = nodemailer.createTransport({
  host: "smtp.hostinger.com",
  port: 587,
  secure: false, // true se usar a porta 465 (SSL)
  auth: {
    user: "matheusmiura@arctechsolutions.com.br",
    pass: "Malule12@", // lembre de colocar isso em variáveis de ambiente depois
  },
});

async function sendMail(to, subject, html) {
  try {
    const info = await mailer.sendMail({
      from: '"MesaJá" <matheusmiura@arctechsolutions.com.br>', // use o email real do seu domínio
      to: to,
      subject: subject,
      html: html,
    });

    console.log("Email enviado:", info.messageId);
    return true;
  } catch (err) {
    console.error("Erro ao enviar email:", err);
    return false;
  }
}

module.exports = {
  mailer,
  sendMail
};
