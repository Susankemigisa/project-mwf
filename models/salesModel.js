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
    productType:{
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
  totalPrice:{
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
            type: mongoose.Schema.Types.ObjectId,
            ref: "UserModel",
            required: true,
          },
transportIncluded: {
  type: Boolean,
  enum: ["Included", "Not Included"],
  default: false,
}

        
        });
        
        module.exports = mongoose.model('SalesModel', salesSchema);
    