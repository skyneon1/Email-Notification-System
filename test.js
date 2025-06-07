const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail", 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
    service: process.env.EMAIL_SERVICE || 'gmail', 
  }, 
  tls: {
    rejectUnauthorized: false, 
  },
});

(async () => {
  const info = await transporter.sendMail({
    from: '"Example Testing" <www.example@gmail.com>',
    to: "www.to@gmail.com",
    subject: "Testing NodeMailer",
    text: "Hi there, we are testing nodemailer",
    html: "<i>NodeMailer Testing SMTP</i>",
  });

  console.log("Message sent:", info.messageId);
})();
