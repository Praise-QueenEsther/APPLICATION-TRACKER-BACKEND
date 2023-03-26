const User = require("../models/User")
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { mailTransport } = require("../utils/sendEmail");
const bcrypt = require('bcryptjs');


const createToken = (id) => {
  return jwt.sign({ id}, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRES_IN,
  });
};

const generateToken = (users, statusCode, req, res) => {
  const token = createToken(users._id);
  res.cookie("token", token, {
    expiresIn: new Date(
      Date.now() + process.env.COOKIE_EXPIRES * 1000 * 60 * 60 * 24
    ),
    httpOnly: true,
    secure: req.secure,
  });
  
  (users.password = undefined),
    res.status(statusCode).json({ msg: "successful", token, data: { users } });
}


const createSignup = async (req, res) => {

    
    try{
      const { email, password,confirmPassword  } = req.body;

      const isExist = await User.findOne({email});
      if(isExist){
        return res.status(412).json({msg:'email already in use'})
      }

      const verificationToken= crypto.randomBytes(40).toString("hex")
     
      
      const user = await User.create({
        email,
        password,
        confirmPassword,
        verificationToken
      })
      user.verificationToken = verificationToken

     await user.save()
     console.log(verificationToken)
    mailTransport.sendMail({
      from: 'estherexcellent21@gmail.com', 
      to: email, 
      subject: "APPLICATION TRACKER",   
     html:` <p>Hi ${email}</p>,
          <P>Welcome to the Application Tracker App, we're glad to have you 🎉🙏</P>,
          <p> Kindly click  on this link http://localhost:4200/Verified/${verificationToken} to verify your account.</p>`

    });
  
  //  generateToken(user, 201, req, res)
     res.status(200).json({
      // email:isExist.email,
      msg: "successfully signed in"
     })

  }
  
  catch(e){
    res.status(500).json({error:"server error"})
  }
    
  };


  const verification=  async (req,res)=>{
    const user=await User.findOne({
      verificationToken: req.params.verificationToken
    })

    if (!user){
      return res.status(404).json({
        msg: "not verified",
      });
    } 

    user.isVerified = true
    user.verificationToken = undefined;
    await user.save()
  }






  const createLogin = async (req, res) => {
    const { email, password } = req.body;
    console.log(email)
     
    try{
  
          if(!email || !password){
            return res.status(400).json({
              msg: "Kindly provide your email and password"
            });
          }
   
     const isExist = await User.findOne({email});
     if(!isExist){
      return res.status(404).json({msg:'email not found'})
     }

     const isPasswordOk = await isExist.comparePassword(password);

     if(!isPasswordOk){
      return res.status(404).json({
        msg:"password not correct"
      })
     }

     generateToken(isExist, 200, req, res);
    }
    catch(error){
          res.status(500).json({error:"this is the error"})
        };

  }



  const createForgetPassword = async (req, res) => {
      const {email} = req.body
    
        try {
      
          
          if (!email) {
            return res.status(400).json({
              msg: "Please provide your email",
            });
            
          }

          const user = await User.findOne({email});
         
          if(!user){
            return res.status(404).json({msg:'email not found'})
           }
          console.log(user)


           const passwordToken = crypto.randomBytes(2).toString("hex");
           const hashedToken = crypto
           .createHash("sha256")
           .update(passwordToken)
           .digest("hex");


              mailTransport.sendMail({
                from: 'estherexcellent21@gmail.com', 
                to: email,
                subject: "change password",
               
                html:` <p>Hi 🎉🙏
                    <P>kindly reset your password with this token: </P>
                  <p> <h4>${passwordToken}</h4></p>`
              });

 

    user.passwordToken =passwordToken;
    

    await user.save();
   
    res.status(200).json({
      status: "success",
      message: "Token sent to email!",
    });
          
        } catch (error) {
          console.error(error);
          return res.status(500).json({
            msg: "Internal Server Error",
  
          });
        }
    }
  

    const changePassword = async (req, res) => {
      const {otp, newPassword,confirmPassword}= req.body;
      const userId = req.params.id

      try {
     
        const user = await User.findOne({
         _id:userId
        });
    
        if (!user) {
          return res.status(404).json({
            msg: "user not found",
          });
        
        }
        
        if(user.passwordToken === otp){
          user.password = newPassword;
          user.confirmPassword = confirmPassword;
          user.passwordToken = undefined;
    
          await user.save();
      
      
         
       return res.status(200).json({
          msg: " invalid token",
        });
        }
    

       
      } catch (error) {
        console.error(error);
        return res.status(500).json({
          msg: "Internal Server Error",
          error: error,
        });
      }
    };


    module.exports= {
    createSignup,
    createLogin,
    createForgetPassword,
    changePassword,
    verification
}


////////////////////////////////////



