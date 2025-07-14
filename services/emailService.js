const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false 
  }
});

async function enviarEmailEmprestimo({ para, nomeLocatario, tituloLivro, dataEmprestimo, dataDevolucao }) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: para,
    subject: 'Confirmação de Empréstimo de Livro',
    html: `
      <p>Olá <strong>${nomeLocatario}</strong>,</p>
      <p>Você realizou o empréstimo do livro <strong>${tituloLivro}</strong>.</p>
      <p>
        <strong>Data do Empréstimo:</strong> ${dataEmprestimo}<br/>
        <strong>Data de Devolução:</strong> ${dataDevolucao}
      </p>
      <p>Boa leitura!<br/>Equipe da Biblioteca 📖</p>
    `
  };

  await transporter.sendMail(mailOptions);
}

module.exports = { enviarEmailEmprestimo };
