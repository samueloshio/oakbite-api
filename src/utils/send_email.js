import nodemailer from 'nodemailer';

const sendEmail = async (userEmail, verificationCode) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.AUTH_EMAIL,
      pass: process.env.AUTH_PASSWORD,
    },
  });
  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: userEmail,
    subject: 'Oakbite Verification Code',
    html: `<h1>Oakbite Email Verification</h1> <p>Your verifiction code is:</p> <h2 style="color: blue;">${verificationCode}</h2><p>Please enter this code on the verification page to complete your regitration process</p><p>If you did not request this, please ignore this email.</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Verification email sent');
  } catch (err) {
    console.log('Email sending failed with an error: ', err);
  }
};

export default sendEmail;
