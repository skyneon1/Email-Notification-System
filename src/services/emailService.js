const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');
const config = require('../config');
const logger = require('../utils/logger');

const transporter = nodemailer.createTransport({
  service: config.email.service,
  auth: {
    user: config.email.user,
    pass: config.email.pass,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

function sendEmail({ to, subject, templateName, templateData }) {
  return new Promise((resolve, reject) => {
    const templatePath = path.join(__dirname, '..', 'templates', `${templateName}.hbs`);
    fs.readFile(templatePath, 'utf8', (err, source) => {
      if (err) {
        logger.error(`Template read error: ${err}`);
        return reject(err);
      }
      const template = handlebars.compile(source);
      const html = template(templateData);

      const mailOptions = {
        from: `"Notification Service" <${config.email.user}>`,
        to,
        subject,
        html,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          logger.error(`Email send error: ${error}`);
          return reject(error);
        }
        logger.info(`Email sent: ${info.messageId}`);
        resolve(info);
      });
    });
  });
}

module.exports = { sendEmail }; 