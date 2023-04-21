import { initializeApp } from 'firebase/app';
import {getFunctions, httpsCallable } from 'firebase/functions';

// Initialize Firebase (if not already done)
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
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