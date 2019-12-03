require('dotenv').config();
const nodemailer = require('nodemailer');
// 메일발송 객체

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.ADMIN_MAIL,
    pass: process.env.ADMIN_MAIL_PASSWORD
  }
});

// 메일 발송
const sendMailToClient = (email, tempNumber) =>
  transporter.sendMail(
    {
      from: 'ssap.possible@gmail.com',
      to: email, // 수신할 이메일
      subject: '쌉가능에서 보내는 인증번호입니다.', // 메일 제목
      html: `<h2>아래의 인증번호를 입력해주세요</h2><h2>인증번호 : ${tempNumber}</h2>` // 메일 내용
    },
    (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    }
  );

// 메일객체 exports
module.exports = { sendMailToClient };
