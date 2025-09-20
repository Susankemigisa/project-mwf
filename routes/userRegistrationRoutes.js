const express = require("express");
const router = express.Router();
const passport = require("passport");

const UserModel = require("../models/userModel")

router.get("/users",(req, res) =>{
  res.render("userRegistration", {title: "user's page"});
});

router.post("/users", async (req, res) => {
  try {
    const user = new UserModel(req.body);
    console.log(req.body);
    let existingUser = await UserModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).send("Already exists!");
    } else {
      await UserModel.register(user, req.body.password, (error) => {
        if (error) {
          throw error;
        }
        res.redirect("/login");
      });
    }
    // user.save();
  } catch (error) {
    res.status(400).send("Something went wrong!");
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


router.get("/login", (req, res) => {
  res.render("login", { title: "Login Page" });
});

router.post("/login",  passport.authenticate("local",{failureRedirect:"/login"}),(req, res)=>{
   req.session.user = req.user;
   if(req.user.role ==="Manager"){
    res.redirect("/dashboard")
 }else if(req.user.role ==="Attendant"){
    res.redirect("/Addsale")
}else(res.render("noneuser"))
});


module.exports = router;