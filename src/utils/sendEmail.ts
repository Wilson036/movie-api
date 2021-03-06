import nodemailer from 'nodemailer';

export async function sendEMail(email: string, url: string) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  //let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: `${process.env.USERNAME}`,
      pass: `${process.env.USERPASSWORD}`,
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"電影時刻客服中心" <foo@example.com>', // sender address
    to: email, // list of receivers
    subject: '忘記密碼確認信', // Subject line
    text: '請於30分鐘內按下列連結以更改密碼', // plain text body
    html: `<a href="${url}">${url}</a>`, // html body
  });

  console.log('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
