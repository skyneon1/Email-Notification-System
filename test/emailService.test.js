const { sendEmail } = require('../src/services/emailService');

test('sendEmail sends an email', async () => {
  const info = await sendEmail({
    to: 'recipient@example.com',
    subject: 'Test Email',
    templateName: 'sample',
    templateData: { name: 'Test' }
  });
  expect(info).toHaveProperty('messageId');
}); 