const nodemailer = require('nodemailer');

const SendMail = async (email,filename, Key) => {

    // Create a transporter object using SMTP
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'mailauthoritycenter@gmail.com', // Your email address
            pass: 'tbkwgpveksdntjof' // Your password
        }
    });
    // Setup email data
    const mailOptions = {
        from: 'mailauthoritycenter@gmail.com', // Sender address
        to: 'merinrijo708@gmail.com', // List of recipients
        subject: 'Secret Key', // Subject line
        // text: `File Name:, Secret Key:  `, // Plain text body?
        // You can also use HTML in the email body:
        html: `<b>File Name: </b>${filename}<br/><b>One time Secret Key: </b> ${Key}<br/>`
    };

    // Send email
    transporter.sendMail(mailOptions,(error, info) => {
     
        if (error) {
            console.error('Error occurred:', error);
        
        } else {
            console.log('Email sent:', info.response);
         
        }
    });

}

module.exports = SendMail;

