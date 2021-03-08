const Usermodel = require("../model/userschema");
const passCatModel = require("../model/passwordCategory");
const passwordModel = require("../model/passwordDetail")
const { check, validationResult } = require('express-validator');

exports.showPassword = async(req,res,next)=> {

    const filterdata = await Usermodel.findById({_id: req.id});
    const data = await passCatModel.find({email:filterdata.email});
    res.render("addNewPassword",{msg : req.user, error:"", success: "", records:data})

}

exports.addPassword = async(req,res,next)=> {

    let project_name =  req.body.project_name;
    let password_detail =  req.body.pass_details;
    if((checkLen(project_name) && checkLen(password_detail)) && req.body.pass_cat != ""){

        const filterdata = await Usermodel.findById({_id: req.id});
        const filter = await passwordModel.find({$and: [{password_category: req.body.pass_cat},  
        {email: filterdata.email}]})
        try{
            if(filter.length > 0){
                const data = await passCatModel.find({email:filterdata.email});
                res.render("addNewPassword",{msg : req.user, error:"Password Details already exist", success: "", records:data})
            }
            else{
                var passwordData = new passwordModel({
                password_category : req.body.pass_cat,
                project_name : req.body.project_name,
                password_detail : req.body.pass_details,
                email: filterdata.email
                })
            await passwordData.save()
            const data = await passCatModel.find({email:filterdata.email});
            res.render("addNewPassword",{msg : req.user, error:"", success: "Password Details Inserted Sucessfully", records:data})
            }
        }   
        catch(e){
            console.log(e);
         }

    }

    else{
        const filterdata = await Usermodel.findById({_id: req.id});
        const data = await passCatModel.find({email:filterdata.email});
        res.render("addNewPassword",{msg : req.user, error:"All fields are required", success: "", records:data});
   
    }

    

}


exports.viewPassDetails = async(req,res,next)=> {

    try{
        
        const filterdata = await Usermodel.findById({_id: req.id});
        const data = await passwordModel.find({email:filterdata.email});
        res.render("viewAllPassword",{msg : req.user, records:data})
     }
    
    catch(e){

        console.log(e)
    }
}

exports.deletePassDetails  = async(req,res,next)=> {

    try{
        const data = await passwordModel.findByIdAndDelete({_id: req.params.id});
        res.redirect("/view-all-password");
     }
     catch(e){

        console.log(e)
    }
}


exports.editPassDetails  = async(req,res,next)=> {

    try{
       const data = await passwordModel.findById({_id : req.params.id});
       res.render("editPassportDetail",{msg : req.user, record:data, records: data.password_category,success:""});
     }
     catch(e){

        console.log(e)
    }
}


exports.updatePassDetails  = async(req,res,next)=> {

    let project_name1 =  req.body.project_name;
    let password_detail1 =  req.body.pass_details;
   if((checkLen(project_name1) && checkLen(password_detail1)) && req.body.pass_cat != ""){
   
    try{
        const data = await passwordModel.findByIdAndUpdate(req.body.id,{password_category: req.body.pass_cat, project_name: req.body.project_name, password_detail: req.body.pass_details});
        res.redirect("/view-all-password")
        }
        catch(e){
            
            console.log(e);
        }
    }
    else{
           
            const data = await passwordModel.findById({_id : req.body.id});
            res.render("editPassportDetail",{msg : req.user, record:data, records: req.body.pass_cat,success:"All the fields are required"});
     }
}
      
