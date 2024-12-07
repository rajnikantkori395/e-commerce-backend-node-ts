// import nodemailer from 'nodemailer';
// import config from '../config';

// // Create a Nodemailer transporter
// const transporter = nodemailer.createTransport({
//   host: config.emailHost,
//   port: config.emailPort,
//   secure: config.emailSecure,
//   auth: {
//     user: config.emailUser,
//     pass: config.emailPassword
//   }
// });

// // Function to send an email
// export const sendEmail = async (to: string, subject: string, html: string): Promise<void> => {
//   try {
//     await transporter.sendMail({
//       from: config.emailFrom,
//       to,
//       subject,
//       html
//     });
//     console.log('Email sent successfully');
//   } catch (error) {
//     console.error('Error sending email:', error);
//     throw error;
//   }
// };
