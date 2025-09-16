const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
     productName:{
            type: String,
            required: true
          },
     category:{
            type:String,
            require:true
          },
     unitPrice:{
            type: Number,
            required: true
          },
     quantity:{
            type: Number,
            required: true,
          }
        });
        
        module.exports = mongoose.model('ProductsModel', productsSchema);
    