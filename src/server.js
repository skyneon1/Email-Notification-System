const express = require('express');
const path = require('path');
const { sendEmail } = require('./services/emailService');
const logger = require('./utils/logger');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/contact', async (req, res) => {
    try {
        const { email, message } = req.body;

        await sendEmail({
            to: process.env.EMAIL_USER, 
            subject: 'New Contact Form Submission',
            templateName: 'contact',
            templateData: {
                senderEmail: email,
                message: message
            }
        });

        res.json({ success: true, message: 'Message sent successfully!' });
    } catch (error) {
        logger.error(`Contact form error: ${error.message}`);
        res.status(500).json({ success: false, message: 'Failed to send message' });
    }
});

app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
}); 