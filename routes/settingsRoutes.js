const express = require("express");
const router = express.Router();

 router.get("/settings",(req, res) =>{
  res.render("settings", {title:"MWF settings"});
});

router.post("/settings",(req, res) =>{
  console.log(req.body);
});



module.exports = router;