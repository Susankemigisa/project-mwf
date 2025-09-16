const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
    fullname: {
            type: String,
            required: true
          },
    email:{
            type: String,
            required: true
          },
    password:{
            type:String,
            require:true
          }
   
        });
        
        module.exports = mongoose.model('LoginModel', loginSchema);
    