const { sendEmail } = require('./services/emailService');
const logger = require('./utils/logger');

async function main() {
  try {
    const info = await sendEmail({
      to: 'recipient@example.com',
      subject: 'Test Email',
      templateName: 'sample',
      templateData: { name: 'User' }
    });
    logger.info(`Message sent: ${info.messageId}`);
  } catch (error) {
    logger.error(`Failed to send email: ${error.message}`);
  }
}

main(); 