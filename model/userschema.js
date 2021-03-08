const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({

 userName : {

    type: String,
    required: true,
    trim: true,
    
 },

email : {

    type: String,
},

password : {

    type: String,
    required: true,
   
},

date : {

    type: Date,
    default: Date.now()
},

tokens:[{

    token : {
        type: String,
        required: true
        
       
  
    }
}]


})


//Generating Web token

userSchema.methods.generateAuthToken = async function(){

    try{
           const token = jwt.sign({_id : this._id.toString()},process.env.SECRET_KEY);
           this.tokens = this.tokens.concat({token:token})
           await this.save();
           return token
    }
    catch(e){
        console.log(e)
    }

}


var userModel = mongoose.model("user",userSchema);
module.exports = userModel;

