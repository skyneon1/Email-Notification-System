const express = require('express');
const path = require('path');
const { sendEmail } = require('./services/emailService');
const logger = require('./utils/logger');

const app = express();
const PORT = process.env.PORT || 3000;

// Get the correct path to the public directory
const publicPath = path.join(__dirname, '..', 'public');

// Middleware
app.use(express.json());

// Serve static files from the public directory
app.use(express.static(publicPath));

// Root route
app.get('/', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
    try {
        const { email, message } = req.body;

        // Send email notification
        await sendEmail({
            to: process.env.EMAIL_USER, // Your email address
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

// Handle 404
app.use((req, res) => {
    res.status(404).sendFile(path.join(publicPath, 'index.html'));
});

// Start server
app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
    logger.info(`Static files being served from: ${publicPath}`);
}); 