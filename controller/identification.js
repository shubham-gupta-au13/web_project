const Usermodel = require("../model/userschema")
const bcrypt = require("bcrypt");

exports.getLogin =  async(req,res,next)=>{

    if(!req.cookies.jwt){
        
        res.render("login",{title : "pizza", msg : "", email: ""})
    }
    
    else{

        
        res.redirect("/dashboard");
    }
}

exports.postLogin = async(req,res,next)=>{

    let email = req.body.email;
    let password = req.body.password;
    try{

            const data = await Usermodel.findOne({email: email})
            if(data){
                     
                      if(bcrypt.compareSync(password,data.password)){

                               const token = await data.generateAuthToken();
                               res.cookie("jwt",token,{
                                expires: new Date(Date.now() + 300000),
                                httpOnly: true
                                });
                            
                        
                            res.redirect("/dashboard")
                        }
                        else{
                            res.render("login",{title : "pizza", msg : "Incorrect Password",email: email})   
                        }
                    }
            else{
                 
                res.render("login",{title : "pizza", msg : "Email does not exit",email: ""})
            }
        }
    catch(e){
        console.log(e)
    }    
}


exports.logout = async(req,res,next)=>{

    await Usermodel.updateOne(
        {_id: req.id},
        { $pull: {"tokens" : {_id: req.tokens[0]._id } } }
    );
    res.clearCookie('jwt');
    res.render("login",{title : "pizza", msg : "",email: ""})

}