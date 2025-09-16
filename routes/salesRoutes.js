const express = require("express");
const router = express.Router();

const SalesModel = require("../models/salesModel")
router.get("/recordSale",(req, res) =>{
  res.render("sales", {title: "sale's page"});
});

router.post("/recordSale", async (req, res) =>{
  try {
  const sale = new SalesModel(req.body);
   console.log(req.body);
  await sale.save()
  res.redirect("/salesTable")
  } catch (error) {
    console.error(error);
    res.redirect("/recordSale")
  }
 
});

// getting sales from the database
router.get("/salesTable", async (req, res)=>{
    try {
      const sales = await SalesModel.find().sort({$natural:-1});
     console.log(sales);
      res.render("salesTable", {sales});
  } catch (error) {
    res.status(400).send("Unable to find items in the database");
  }
});


module.exports = router;