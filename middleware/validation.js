var Usermodel = require("../model/userschema")


validUser = async function(req,res,next){

    let userName = req.body.user_name
    try{
         const data = await Usermodel.findOne({userName : userName})
         if(data){

             return res.render("signup",{title : "pizza", msg : "User Already Exist",uname: "", email: ""})
         }
         next()
    
      }
    catch(e){
        console.log(e)
    }
                   
}

validEmail = async function(req,res,next){

 let email = req.body.email
 try{
      const data = await Usermodel.findOne({email : email})
      if(data){

          return res.render("signup",{title : "pizza", msg : "Email Already Exist", uname: "", email: ""})
      }
      next()
 
   }
 catch(e){
     console.log(e)
 }
                
}

checkLen = function(input){

    if(input.length == 0){

        return 0

    }
    else{

        return 1;

    }
    
}   


module.exports = {validUser,validEmail}