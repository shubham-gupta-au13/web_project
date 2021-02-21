const express = require("express");
const router = express.Router();
require("../server");
var Usermodel = require("../model/userschema")
var passCatModel = require("../model/passwordCategory")
var passwordModel = require("../model/addPassword")
var {validUser,validEmail} = require("../middleware/middleware")
var auth = require("../middleware/auth")
var bodyParser = require('body-parser')
//const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
//const { render } = require("ejs");
const { check, validationResult } = require('express-validator');
router.use(bodyParser.urlencoded({ extended: false }))






/* Login  Get Routes */

router.get("/",function(req,res){

    if(!req.cookies.jwt){

        res.render("login",{title : "pizza", msg : "", email: ""})
    }
        
    else{
        res.redirect("/dashboard");
    }
    

    
})


/* Login Post Routes */


router.post("/",async function(req,res){

    let email = req.body.email;
    let password = req.body.password;
    try{

            const data = await Usermodel.findOne({email: email})
            if(data){
                     
                      if(bcrypt.compareSync(password,data.password)){

                           // if(!req.cookies.jwt)
                            //{
                                const token = await data.generateAuthToken();
                               
                                res.cookie("jwt",token,{
                                expires: new Date(Date.now() + 300000),
                                httpOnly: true
                                });
                            //} 
                        
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

      
})


/* Signup Get Routes */

router.get("/signup",function(req,res){

    if(!req.cookies.jwt){

        res.render("signup",{title : "pizza", msg : "", uname: "", email: ""});
    }
        
    else{
        res.redirect("/dashboard");
    }

    
})

/* Signup Post  Routes */

router.post("/signup",validUser,validEmail,async function(req,res){

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


    
})

/* Logout Routes */

router.get("/logout",auth,async function(req,res){

    
    await Usermodel.update(
        {_id: req.id},
        { $pull: {"tokens" : {_id: req.tokens[0]._id } } }
    );
    res.clearCookie('jwt');
    res.render("login",{title : "pizza", msg : "",email: ""})
})


/* Dashboard Routes */


router.get("/dashboard",auth,function(req,res){

  res.render("dashboard",{msg : req.user});
})



/* Add-new-category Get Routes */

router.get("/add-new-category",auth,function(req,res){

    res.render("addNewCategory",{msg : req.user, error : "",success:""});
})


/* Add-new-category Post Routes */

router.post("/add-new-category",auth, [check("passwordCategory","Enter Password Category Name").isLength({min:1})],async function(req,res){


    const error = validationResult(req);
    if(!error.isEmpty()){

        res.render("addNewCategory",{msg : req.user, error : error.mapped(),success:""});
    }
    else{

        try{

            var passCat  =  new passCatModel({
               
                password_category : req.body.passwordCategory
                

            })
            await passCat.save()
            res.render("addNewCategory",{msg : req.user, error : "",success:"Password Category Inserted Sucessfully"});

        }

        catch(e){

            console.log(e)
        }
        
    }
    
})



router.get("/passwordCategory",auth,async function(req,res){

   const data = await passCatModel.find({});
    res.render("passwordCategory",{msg :req.user,record: data});
})


router.get("/passwordCategory/delete/:id",auth,async function(req,res){

    const data = await passCatModel.findByIdAndDelete({_id: req.params.id});
    //console.log(data);
    res.redirect("/passwordCategory");
 })


 router.get("/passwordCategory/edit/:id",auth,async function(req,res){

    const data = await passCatModel.findById({_id: req.params.id});
   // console.log(data);
    //console.log(data[0].password_category);
    res.render("editPassCategory",{msg :req.user, error: "", success: "",val: data.password_category,id: data._id});
 })


 router.post("/passwordCategory/edit",auth,async function(req,res){

    const data = await passCatModel.findByIdAndUpdate(req.body.id,{password_category:req.body.passwordCategory});
    res.redirect("/passwordCategory")
 })


 router.get("/add-new-password", auth,async function(req,res){

    const data = await passCatModel.find({});
   res.render("addNewPassword",{msg : req.user, error:"", success: "", records:data})

 })


 router.post("/add-new-password", auth, async function(req,res){

    try{
        
        var passwordData = new passwordModel({
        password_category : req.body.pass_cat,
        project_name : req.body.project_name,
        password_detail : req.body.pass_details
       })
        await passwordData.save()
        const data = await passCatModel.find({});
        res.render("addNewPassword",{msg : req.user, error:"", success: "Password Details Inserted Sucessfully", records:data})
    }
    catch(e){

        console.log("heloo")
        console.log(e);
    }


})


router.get("/view-all-password", auth, async function(req,res){


     try{
        const data = await passwordModel.find({});
      
        res.render("viewAllPassword",{msg : req.user, records:data})
     }
    
    catch(e){

        console.log(e)
    }


})


router.get("/password-detail/delete/:id", auth, async function(req,res){


   try{
        const data = await passwordModel.findByIdAndDelete({_id: req.params.id});
        res.redirect("/view-all-password");
     }
     catch(e){

        console.log(e)
    }

})



router.get("/password-detail/edit/:id", auth, async function(req,res){


    try{
         const data = await passwordModel.findById({_id : req.params.id});
         const data2 = await passCatModel.find({});
         res.render("editPassportDetail",{msg : req.user, record:data, records: data2,success:""});
      }
      catch(e){
 
         console.log(e)
     }
 
 })

 router.post("/password-detail/edit", auth, async function(req,res){

    try{
    console.log(req.body.id)
    console.log(req.body.pass_cat)
    const data = await passwordModel.findByIdAndUpdate(req.body.id,{password_category: req.body.pass_cat, project_name: req.body.project_name, password_detail: req.body.pass_details});
    res.redirect("/view-all-password")
    }
    catch(e){
        
        console.log(e.name);
    }
  
 })

module.exports = router;