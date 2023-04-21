import { initializeApp } from 'firebase/app';
import {getFunctions, httpsCallable } from 'firebase/functions';

// Initialize Firebase (if not already done)
const firebaseConfig = {
    apiKey: 'AIzaSyBPx1F8yh4YtG3d3L8ddOWKqc_Ic1SH5jk',
    authDomain: 'waiverapp-af9d8.firebaseapp.com',
    projectId: 'waiverapp-af9d8',
    storageBucket: 'waiverapp-af9d8.appspot.com',
    messagingSenderId: '79747709016',
    appId: '1:79747709016:web:75bd26aaec79806bc8722d'
  };

const app = initializeApp(firebaseConfig);

// Get a reference to the Firebase Function
const functions = getFunctions(app);
const sendEmailFunction = httpsCallable(functions, 'sendEmail');

export async function sendPdfByEmail(email, pdfBase64) {
  // Send the email
  try {
    const response = await sendEmailFunction({
      to: email,
      subject: 'Signed Waiver',
      content: 'Please find the signed waiver attached.',
      attachments: [
        {
          content: pdfBase64,
          filename: 'signed-document.pdf',
          type: 'application/pdf',
          disposition: 'attachment',
          encoding: 'base64',
        },
      ],
    });

    if (response.data.success) {
      console.log('Email sent successfully');
    } else {
      console.error('Failed to send email');
    }
  } catch (error) {
    console.error('Error while sending email:', error);
  }
}