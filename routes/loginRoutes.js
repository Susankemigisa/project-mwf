const express = require("express");
const passport = require("passport");
const router = express.Router();

router.get("/login", (req, res) => {
  res.render("login", { title: "Login Page" });
});

router.post("/login",
  passport.authenticate("local", { failureRedirect: "/login" }),
  (req, res) => {
    req.session.user = req.user;
    if (req.user.role === "Manager") {
      res.redirect("/dashboard");
    } else if (req.user.role === "Attendant") {
      res.redirect("/recordSale");
    } else {
      res.render("noneuser");
    }
  }
);

router.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy((error) => {
      if (error) {
        return res.status(500).send("Error logging out");
      }
      res.redirect("/login");
    });
  }
});

module.exports = router;
