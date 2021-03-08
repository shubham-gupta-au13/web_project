require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const path = require('path');

//  Set the Body Parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

// Set the template Engine
const ejs = require("ejs");
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs")

// Set the cookie parser
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// Serve Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Router Middleware 
const Router = require("./routes/router");
app.use("/",Router);

//Database Connection
const initDB = require("./config/dbconn");
initDB();

// Set the Port
app.listen(PORT,function(){

    console.log(`Server i running at ${PORT}`)
})

