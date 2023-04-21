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
    // Map through attachments and create a new object with the required fields
    const formattedAttachments = attachments.map((attachment) => ({
      content: Buffer.from(attachment.content, 'base64'),
      filename: attachment.filename,
      contentType: attachment.type,
      contentDisposition: attachment.disposition,
    }));

    const mailOptions = {
      from: gmailEmail,
      to,
      subject,
      html: content,
      attachments: formattedAttachments,
    };

    await transport.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
});
