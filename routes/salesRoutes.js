const express = require("express");
const router = express.Router();
const {ensureautheticated,ensureAgent}= require("../middleware/auth")
const SalesModel = require("../models/salesModel")
const StockModel = require("../models/stockModel")
// const { default: mongoose } = require("mongoose");

router.get("/recordSale",async (req, res) =>{
  try {
    const stocks = await StockModel.find()
     res.render("sales", {stocks, title: "sale's page"});
  } catch (error) {
    console.error(error.message)
  }
});

router.post("/recordSale",ensureautheticated,ensureAgent, async (req, res) =>{
  try {
    // destructuring
    const{customerName, productName, productType, quantity, unitPrice, date, paymentType, transportIncluded} = req.body;
    const userId = req.session.user._id;
    const stock = await StockModel.findOne({productType:productType, productName:productName});
    if(!stock){
      return res.status(400).send("Stock not found");
    }if(stock.quantity < Number(quantity)){
      return res.status(400).send("Insufficient stock")
    };

//If no total price captured on the front end, do this
let total = unitPrice * quantity
if(transportIncluded){
  total *= 1.05
};
//If you have totalPrice already captured, do this
// if(transportIncluded){
//  totalPrice *= 1.05     //adds 5%
// };
if(stock && stock. quantity > 0){
    const sale = new SalesModel({customerName,
     productName,
     productType,
     quantity,
     unitPrice,
     totalPrice: total,
     transportIncluded:!! transportIncluded,
     date, 
     paymentType,
     salesAgent: userId
    });
   console.log("Saving sale:",sale);
   console.log(userId);
  await sale.save();

  //decreas quantity from the stock collection
  stock.quantity -= quantity
  console.log("new quantity after sale", stock.quantity)
  await stock.save();
  res.redirect("salesTable");
}else{
  return res.status(404).send("Product not found or soldout")
};
  
  } catch (error) {
    console.error("error saving stock", error.message);
    res.redirect("/recordSale")
  }
 
});

// getting sales from the database
router.get("/salesTable", async (req, res)=>{
    try {
      //sales agent only sees their own sales
      const sales = await SalesModel.find().populate("salesAgent","fullName");
      const currentUser = req.session.user;
      res.render("salesTable", {sales, currentUser});
  } catch (error) {
    console.error(error.message);
    res.redirect('/')
  }
});

router.get("/getReciept/:id", async (req, res)=>{
    try {
      //sales agent only sees their own sales
      const sale = await SalesModel.findOne({_id: req.params.id}).populate("salesAgent","fullName");
      res.render("reciept", {sale});
  } catch (error) {
    console.error(error.message);
    res.status(400).send("Unable to find sale")
  }
});

router.get('/editsale/:id', async (req, res) => {
  try {
      const sale = await SalesModel.findById(req.params.id)
      console.log(sale._id)
  res.render("editSales", {sale})
  } catch (error) {
    console.error(error)
  }
});
router.put('/editsale/:id', async (req, res) => {
  try {
    const sale = await SalesModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!sale) return res.status(404).send("sale not found");
    res.redirect("/salesTable");
  } catch (error) {
    res.status(500).send(error.message);
  }
});
router.post("/deletesale", async (req, res) => {
  try {
    await SalesModel.deleteOne({ _id: req.body.id });
    res.redirect("/salesTable");
  } catch (error) {
    console.error("Error deleting sale:", error.message);
    res.status(400).send("Unable to delete sale from database");
  }
});

module.exports = router;