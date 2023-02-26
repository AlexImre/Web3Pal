const nodemailer = require('nodemailer');

const smtpTransport = nodemailer.createTransport({
  host: 'smtp-relay.sendinblue.com',
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

async function run() {
  let sendResult = await smtpTransport.sendMail({
    from: 'Alex <alexandre.imre@gmail.com',
    to: 'alexandre.imre@gmail.com',
    subject: 'Hello from NodeMailer',
    text: 'Hi, this was sent from nodemailer!',
    html: '<body><h1>Hi, this was sent from nodemailer!</h1></body>',
  });

  console.log(sendResult);
}

run().catch((err) => console.error(err));
