const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
 fullName:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  phone:{
    type: Number,
    required: true
  },
    password:{
    type: String,
    required: true
  },
    confirmPassword:{
    type: String,
    required: true
  },
  
  role:{
    type: String,
    required: true,

  }
});

userSchema.plugin(passportLocalMongoose,{
  usernameField:"email"
});
module.exports = mongoose.model('UserModel', userSchema);