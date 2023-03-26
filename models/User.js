const mongoose=require("mongoose")
const bcrypt = require('bcryptjs');
const crypto = require("crypto");
// const validator=require("validator")

const userSchema = new mongoose.Schema({
    email: {
      type: String,
      required: [true, 'Email address is required'],
      trim: true,
      lowercase: true,
      unique: true,
      validate: {
        validator: function (value) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        message: props => `${props.value} is not a valid email address!`
      }
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters long']

    },

    passwordToken:{
      type: String,

      },

      verificationToken:{
        type:String
      },

      isVerified:{
        type:Boolean,
        default:false
      },

    confirmPassword: {
      type: String,
      // required: [true, 'Please confirm your password'],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: 'Passwords do not match'
      },

     
    },

    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordTokenExpirationDate: Date
  });
  


  userSchema.pre("save", async function(){
    if(!this.isModified("password"))
    return;
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    this.confirmPassword=undefined;
  })

  userSchema.pre("save", function (next) {
    if (!this.isModified("password") || this.isNew) 
    return next();
  
    this.passwordChangedAt = Date.now() - 1000;
    next();
  });

  userSchema.methods.comparePassword=async function(clientPassword){
    const isMatch = await bcrypt.compare(clientPassword, this.password);
    return isMatch;
  }

  userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
    if (this.passwordChangedAt) {
      const changedTimeStamp = parseInt(
        this.passwordChangedAt.getTime() / 1000,
        10
      );
  
      return JWTTimestamp < changedTimeStamp; // returns true or false
    }
  
    // False means NOT changed
    return false;
  };






  
  userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString("hex");
  
    this.passwordResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
  
    this.passwordTokenExpirationDate = Date.now() + 10 * 60 * 1000;
  
    return resetToken;
  };
  
  

module.exports = mongoose.model("User",userSchema)

////////////////////////////////////////

