const mongoose = require("mongoose");

const passCatSchema = new mongoose.Schema({

    password_category : {
   
       type: String,
       required: true,
       trim: true,
       index:{
    
           unique: true
       }
    },
    date : {

        type: Date,
        default: Date.now()
    }
})

var passCatModel = mongoose.model("password_cat",passCatSchema);
module.exports = passCatModel;