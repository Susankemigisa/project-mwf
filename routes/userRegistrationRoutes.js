const express = require("express");
const router = express.Router();

const UserModel = require("../models/userModel")
router.get("/users",(req, res) =>{
  res.render("userRegistration", {title: "user's page"});
});

router.post("/users", async (req, res) =>{
  try {
  const user = new UserModel(req.body);
   console.log(req.body);
  await user.save()
  res.redirect("/login")
  } catch (error) {
    console.error(error);
    res.redirect("/users")
  }
 
});
router.get("/userTable", async (req, res)=>{
    try {
      const users = await UserModel.find().sort({$natural:-1});
     console.log(users);
    res.render("registeredUsers", {users});
  } catch (error) {
    res.status(400).send("Unable to find users in the database");
  }
});

module.exports = router;