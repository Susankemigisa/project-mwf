const express = require("express");
const router = express.Router();

const StockModel = require("../models/stockModel")

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
// updatingstock
router.get('/editstock/:id', async (req, res)=>{
    let item = await StockModel.findById(req.params.id);
    // console.log(item)
  res.render("editStock", {item, title: "Edit Stock page"})
});
router.put('/editstock/:id',async (req, res)=>{
  try {
    console.log(req.params.id)
    const stock = await StockModel.findByIdAndUpdate(req.params.id, req.body,{ new: true});
    console.log(stock)
    // if(!stock){
    //   return res.status(404).send("Product not found")
    // }
    // res.redirect("/stocklist")
  } catch (error) {
    
  }
})

module.exports = router;