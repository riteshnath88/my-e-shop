const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  // 1) Create a Transporter
  // const transporter = nodemailer.createTransport({
  //   host: process.env.SMTP_HOST,
  //   port: process.env.SMTP_PORT,
  //   service: process.env.SMTP_SERVICE,
  //   auth: {
  //     user: process.env.SMTP_MAIL,
  //     pass: process.env.SMTP_PASSWORD,
  //   },
  // });

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // const mailOptions = {
  //   from: process.env.SMTP_MAIL,
  //   to: options.email,
  //   subject: options.subject,
  //   text: options.message,
  // };

  const mailOptions = {
    from: "Ritesh Nath <ritesh@official.io>",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
