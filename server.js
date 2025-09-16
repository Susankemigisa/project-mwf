// 1. Dependencies
const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
const passport = require("passport");
const expressSession = require("express-session")
const MongoStore = require("connect-mongo");
const moment = require("moment");
const methodOverride = require("method-override");

require('dotenv').config();
const UserModel = require("./models/userModel")

//import routes
const salesRoutes = require("./routes/salesRoutes");
const loginRoutes = require("./routes/loginRoutes");
const stockRoutes = require("./routes/stockRoutes");
const userRegistrationRoutes = require("./routes/userRegistrationRoutes");
const indexRoutes = require("./routes/indexRoutes");
const managerDashboardRoutes = require("./routes/managerDashboardRoutes");
const managerReportRoutes = require("./routes/managerReportRoutes");
const productsRoutes = require("./routes/productsRoutes");
const settingsRoutes = require("./routes/settingsRoutes");
// 2. Instantiations
const app = express();
const port = 3000

//3. Configurations
app.locals.moment = moment;
//setting up mondodb connection
mongoose.connect(process.env.MONGODB_URL)
mongoose.connection
  .on('open', () => {
    console.log('connected successfully to mongodb');
  })
  .on('error', (err) => {
    console.log(`Connection error: ${err.message}`);
  });

  // setting view engine to pug
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

// 4. Middleware
//method overide
app.use(methodOverride("_method"));
// app.use(express.static('public')); //static files
app.use(express.static(path.join(__dirname, "public")))
// app.use("/public/uploads", express.static(__dirname + "/public/uploads"))
app.use(express.urlencoded({extended:true}))// helps to pass data from forms
//image uploads
app.use('/public/uploads', express.static(__dirname+ '/public/uploads'))
//express session configs
app.use(expressSession({
  secret: process.env.SESSION_SECRET,
   resave: false,
   saveUninitialized:false,
   store: MongoStore.create({mongoUrl:process.env.MONGODB_URL}),
   cookie: {maxAge:24*60*60*1000}//one day
}));
// passport configs
app.use(passport.initialize());
app.use (passport.session());

// authenticate with passport local strategy
passport.use(UserModel.createStrategy());
passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser());

// 5. Routes
//using imported routes
app.use("/",salesRoutes);
app.use("/",loginRoutes);
app.use("/",stockRoutes);
app.use("/",userRegistrationRoutes);
app.use("/",indexRoutes);
app.use("/",managerDashboardRoutes);
app.use("/",managerReportRoutes)
app.use("/",productsRoutes);
app.use("/",settingsRoutes);
// non existent route handler
app.use((req, res) =>{
  res.status(404).send("Oops! Route not found.");
});



// 6. Bootstrapping Server
//this should always be the last line in that file
app.listen(port, () => console.log(`listening on port ${port}`)); 

