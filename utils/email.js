// const nodemailer = require("nodemailer");
// // const pug = require('pug');
// const htmlToText = require("html-to-text");

// module.exports = class Email {
//     constructor(user, url) {
//       (this.to = user.email), console.log(user);
//       this.email = user.email.split(" ")[0];
//       this.url = url;
//       this.from = `Esther Aka <${process.env.EMAIL_FROM}>`;
//     }

//     newTransport() {
//         return nodemailer.createTransport({
//           host: process.env.GMAIL_HOST,
//           port: process.env.GMAIL_PORT,
//           auth: {
//             user: process.env.GMAIL_USERNAME,
//             pass: process.env.GMAIL_PASSWORD,
//           },
//         });
//       }


//         // send the actual email
//         async send(template, subject) {
//             const html = template;
        
//             const mailOptions = {
//               from: this.from,
//               to: this.to,
//               subject,
//               html,
//               text: htmlToText.toString(html),
//             };
        
//             await this.newTransport().sendMail(mailOptions);
//           }
        
//           async sendWelcome() {
//             await this.send(
//               `
//             <!DOCTYPE html>
//             <html lang="en">
//             <head>
//                 <meta charset="UTF-8">
//                 <meta http-equiv="X-UA-Compatible" content="IE=edge"> 
//                 <style>
//                 @media only screen and (max-width: 620px){
//                     h1{
//                         font=size: 20px;
//                         padding: 5px
//                     }
//                 }
//                 </style>
//             </head>
//             <body>
//                 <p>Hi ${this.email}</p>
//                 <P> we're glad to have you 🎉🙏</P>
//                 <p> We're all a big family here <br> ${this.url}.</p>
                
//             </body>
//           </html>
//             `,
//               "Welcome to the Application Tracker App!"
//             );
//           }


//           async sendPasswordReset() {
//             await this.send(
//               `
//             <!DOCTYPE html>
//             <html lang="en">
//             <head>
//                 <meta charset="UTF-8">
//                 <meta http-equiv="X-UA-Compatible" content="IE=edge"> 
//                 <style>
//                 @media only screen and (max-width: 620px){
//                     h1{
//                         font=size: 20px;
//                         padding: 5px
//                     }
//                 }
//                 </style>
//             </head>
//             <body>
//                 <p>Hi ${this.email}</p>
//                 <p>Forgot your password? Please use the link to reset your password: ${this.url}.</p>
//             </body>
//           </html>
//             `,
//               "Your password reset token (valid for only 10 minutes)"
//             );
          
//         }


// }

// const nodemailer = require("nodemailer");
// // const pug = require('pug');
// const htmlToText = require("html-to-text");

// module.exports = class Email {
//   constructor(user, url) {
//     (this.to = user.emailAddress), console.log(user);
//     this.emailAddress = user.emailAddress.split(" ")[0];
//     this.url = url;
//     this.from = `Esther Aka <${process.env.EMAIL_FROM}>`;
//   }

//   newTransport() {
//     return nodemailer.createTransport({
//       host: process.env.GMAIL_HOST,
//       port: process.env.GMAIL_PORT,
//       auth: {
//         // user: process.env.GMAIL_USERNAME,
//         // pass: process.env.GMAIL_PASSWORD,
//         // user: process.env.SMS_USER,
//         // pass: process.env.SMS_PASS,
//       },
//     });
//   }

//   // send the actual email
//   async send(template, subject) {
//     const html = template;

//     const mailOptions = {
//       from: this.from,
//       to: this.to,
//       subject,
//       html,
//       text: htmlToText.toString(html),
//     };

//     await this.newTransport().sendMail(mailOptions);
//   }

//   async sendWelcome() {
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
//   </html>
//     `,
//       "Your password reset token (valid for only 10 minutes)"
//     );
//   }
// };



////for forgetPassword

//  try {
          //   const resetURL = `https://${req.get(
          //     "host" 
          //   )}/forgetPassword/${resetToken}`;
          //   // await new Email(user, resetURL).sendPasswordReset();

          //   mailTransport.sendMail({
          //     from: 'estherexcellent21@gmail.com', // sender address
          //     to: email, // list of receivers
          //     subject: "APPLICATION TRACKER", // Subject line
          //     html: `Hello, ${email}, welcome to Application Tracker. Your us is a success.</h4>`, // html body
          //   });
          
            // res.status(200).json({
            //   status: "success",
            //   message: "Token sent to email!",
            // });
          // } catch (err) {
          //   user.passwordResetToken = undefined;
          //   user.passwordResetExpires = undefined;
          //   await user.save({ validateBeforeSave: false });
      
          //   return res.status(400).json({
          //     msg: "There was an error sending the email. Try again later!",
          //   });
           
          // }
      

           // html: `Hi, kindly reset your password with this token: <h4>${passwordToken}</h4>`,