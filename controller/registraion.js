const Usermodel = require("../model/userschema")
const bcrypt = require("bcrypt");

exports.getSignup = (req,res,next)=>{

    if(!req.cookies.jwt){

        res.render("signup",{title : "pizza", msg : "", uname: "", email: ""});
    }
        
    else{
        console.log("bsdk");
        res.redirect("/dashboard");
    }

}


exports.postSignup = async(req,res,next)=>{

    if(req.body.pwd == req.body.cpwd){

        try{
            var password = bcrypt.hashSync(req.body.pwd,10)
            
            var userDetails  =  new Usermodel({
               
                userName : req.body.user_name,
                email : req.body.email,
                password: password

            })
            await userDetails.save()
            res.render("signup",{title : "pizza", msg : "User Registerd Sucessfully",uname: "", email: ""})
        }
        catch(e){
            console.log(e)
        }
    }
    else{

         res.render("signup",{title : "pizza", msg : "Password Must Be Same", uname: req.body.user_name, email: req.body.email})
    }


}