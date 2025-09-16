const express = require("express");
const router = express.Router();

 router.get("/reports",(req, res) =>{
  res.render("managerReport", {title:"Reports"});
});

router.post("/reports",(req, res) =>{
  console.log(req.body);
});



module.exports = router;