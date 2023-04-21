const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;

const transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});

exports.sendEmail = functions.https.onCall(async (data, context) => {
  const { to, subject, content, attachments } = data;

  try {
    const mailOptions = {
      from: gmailEmail,
      to,
      subject,
      html: content,
      attachments,
    };

    await transport.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
});
