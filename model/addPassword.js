const mongoose = require("mongoose");

const passwordSchema = new mongoose.Schema({

    password_category : {
   
       type: String,
       required: true,
       trim: true,
       index:{
    
           unique: true
       }
    },

    project_name:{

       type: String,
       required: true,
       trim: true,
       index:{
    
           unique: true
    }

    },

    password_detail :{

        
       type: String,
       required: true,
       trim: true

    },

    date : {

        type: Date,
        default: Date.now()
    }
})

var passwordModel = mongoose.model("password_Detail",passwordSchema);
module.exports = passwordModel;