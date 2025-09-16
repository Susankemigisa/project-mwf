const express = require("express");
const router = express.Router();

const ProductsModel = require("../models/productsModel")
router.get("/addProduct",(req, res) =>{
  res.render("products", {title: "Product's page"});
});


router.post("/addProduct", async (req, res) =>{
  try {
  const product = new ProductsModel(req.body);
   console.log(req.body);
  await product.save()
  res.redirect("/productsTable")
  } catch (error) {
    console.error(error);
    res.redirect("/addProduct")
  }
 
});
// getting Products from the database
router.get("/productsTable", async (req, res)=>{
    try {
      const products = await ProductsModel.find().sort({$natural:-1});
     console.log(products);
      res.render("availableProducts", {products});
  } catch (error) {
    res.status(400).send("Can not find item");
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


module.exports = router;