var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'nodejsps@gmail.com',
      pass: 'nodejs123'
    }
  });
  
module.exports = transporter;