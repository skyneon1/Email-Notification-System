require('dotenv').config();

module.exports = {
  email: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
    service: process.env.EMAIL_SERVICE || 'gmail',
  }
}; 