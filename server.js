require("dotenv").config();
const express = require("express");
const initDB = require("./config/dbconn");
const Router = require("./routes/router");
const ejs = require("ejs");
const app = express();
const PORT = process.env.PORT || 5000;
const path = require('path');
const cookieParser = require("cookie-parser");

// Set the template Engine
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs")
app.use(cookieParser());


// Serve Static Files
app.use(express.static(path.join(__dirname, 'public')));




// Router Middleware 
app.use("/",Router);



//Database Connection

initDB();

app.listen(PORT,function(){

    console.log(`Server i running at ${PORT}`)
})

