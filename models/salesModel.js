const mongoose = require('mongoose');

const salesSchema = new mongoose.Schema({
    customerName: {
            type: String,
            required: true
          },
    productName:{
            type: String,
            required: true
          },
   quantity:{
            type: Number,
            require:true
          },
   unitPrice:{
            type: Number,
            required: true
          },
    date:{
            type: String,
            required: true,
          },

    paymentType:{
            type: String,
            required: true,
          },
    salesAgent:{
            type: String,
            required: true,
          },
    transportIncluded:{
            type: String,
            required: true,
          },
        
        });
        
        module.exports = mongoose.model('SalesModel', salesSchema);
    