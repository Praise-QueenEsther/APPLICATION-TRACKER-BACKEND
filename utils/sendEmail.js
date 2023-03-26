const nodemailer = require("nodemailer");
// const htmlToText = require("html-to-text");
const mailTransport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
    // host: process.env.GMAIL_HOST,
    // port: process.env.GMAIL_PORT,
  secure: true, // use TLS
  auth: {
    user: process.env.GMAIL_USERNAME,
    pass: process.env.GMAIL_PASSWORD,
  },
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false,
  },
});

mailTransport.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});


//<!DOCTYPE html>
//     <html lang="en">
//     <head>
//         <meta charset="UTF-8">
//         <meta http-equiv="X-UA-Compatible" content="IE=edge"> 
//         <style>
//         @media only screen and (max-width: 620px){
//             h1{
//                 font=size: 20px;
//                 padding: 5px
//             }
//         }
//         </style>
//     </head>
//     <body>
//         <p>Hi ${this.email}</p>
//         <P>Welcome to the Application Tracker App, we're glad to have you 🎉🙏</P>
//         <p> We're all a big family here <br> ${this.url}.</p>
        
//     </body>
//   </html>
//     `,
//       "Welcome to the Application Tracker App!"
//     );
//   }

//   async sendPasswordReset() {
//     await this.send(
//       `
//     <!DOCTYPE html>
//     <html lang="en">
//     <head>
//         <meta charset="UTF-8">
//         <meta http-equiv="X-UA-Compatible" content="IE=edge"> 
//         <style>
//         @media only screen and (max-width: 620px){
//             h1{
//                 font=size: 20px;
//                 padding: 5px
//             }
//         }
//         </style>
//     </head>
//     <body>
//         <p>Hi ${this.email}</p>
//         <p>Forgot your password? Please use the link to reset your password: ${this.url}.</p>
//     </body>
   //</html>


module.exports = { mailTransport };