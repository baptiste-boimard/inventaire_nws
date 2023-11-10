const nodemailer = require('nodemailer');

const createMailTransporter = () => {
  const transporter = nodemailer.createTransport({
    // si SMTP ou autre consulter la doc de nodemailer
    service: "hotmail",
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
    },
  });
  return transporter;
};

export default createMailTransporter;