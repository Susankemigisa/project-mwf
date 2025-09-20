const express = require("express");
const router = express.Router();

const StockModel = require("../models/stockModel");
const { default: mongoose } = require("mongoose");

router.get("/Addstock",(req, res) =>{
  res.render("registerStock", {title: "stock page"});
});


router.post("/Addstock", async (req, res) => {
  try {
    console.log("Incoming body:", req.body);
    const stock = new StockModel(req.body);
    await stock.save();
    console.log("Stock saved!");
    res.redirect("/stocklist");
  } catch (error) {
    console.error("Error saving stock:", error.message);
    res.redirect("/Addstock");
  }
});

// getting stock from the database
router.get("/stocklist", async (req, res)=>{
    try {
      let items = await StockModel.find().sort({$natural:-1});
     console.log(items);
      res.render("stockTable", {items});
  } catch (error) {
    res.status(400).send("Unable to find items in the database");
  }
});




router.post("/deletestock", async(req, res)=>{
  try {
    await registerStockModel.deleteOne({_id:req.body.id});
    res.redirect("back")
  } catch (error) {
    res.status(400).send('Unable to delete item from database')
  }
})
router.post("/deletestock", async (req, res) => {
  try {
    await StockModel.deleteOne({ _id: req.body.id });
    res.redirect("/stocklist");
  } catch (error) {
    console.error("Error deleting stock:", error.message);
    res.status(400).send("Unable to delete item from database");
  }
});
router.put('/editstock/:id', async (req, res) => {
  try {
    const stock = await StockModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!stock) return res.status(404).send("Item not found");
    res.redirect("/stocklist");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;