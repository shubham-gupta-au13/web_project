const Usermodel = require("../model/userschema");
const passCatModel = require("../model/passwordCategory");
const passwordModel = require("../model/passwordDetail")
const { check, validationResult } = require('express-validator');

exports.showCategory = async(req,res,next)=> {

    res.render("addNewCategory",{msg : req.user, error : "",success:""});

}

exports.addCategory = async(req,res,next)=> {

    
    const error = validationResult(req);
    if(!error.isEmpty()){

        res.render("addNewCategory",{msg : req.user, error : error.mapped(),success:""});
    }
    else{

        try{
            const data = await Usermodel.findById({_id: req.id});
            const filter = await passCatModel.find({$and: [{password_category: req.body.passwordCategory},  
                            {email: data.email}]})
            if(filter.length > 0){

               res.render("addNewCategory",{msg : req.user, error :"",success:"Password Category already exist"});
            }
            else{
                    var passCat  =  new passCatModel({
                    password_category : req.body.passwordCategory,
                    email: data.email
                    })
                await passCat.save()
                res.render("addNewCategory",{msg : req.user, error : "",success:"Password Category Inserted Sucessfully"});
                }

            }

        catch(e){

            console.log(e)
        }
        
    }
    
}

exports.viewCategory = async(req,res,next)=> {

    const filterdata = await Usermodel.findById({_id: req.id});
    const data = await passCatModel.find({email:filterdata.email});
     res.render("passwordCategory",{msg :req.user,record: data});

}

exports.deleteCategory = async(req,res,next)=> {

    const data = await passCatModel.findByIdAndDelete({_id: req.params.id});
    const data1 = await Usermodel.findById({_id: req.id});
    const filter = await passwordModel.findOneAndDelete({$and: [{password_category: data.password_category},  
                        {email: data1.email}]})
    res.redirect("/passwordCategory");
}


exports.editCategory = async(req,res,next)=> {
    
    const data = await passCatModel.findById({_id: req.params.id});
    res.render("editPassCategory",{msg :req.user, error: "", val: data.password_category,id: data._id});
}

exports.updateCategory = async(req,res,next)=> {


        let input = req.body.passwordCategory;
        console.log(req.params.cat);
        const data = await Usermodel.findById({_id: req.id});
        if(checkLen(input))
        {
                const filter = await passCatModel.find({$and: [{password_category: req.body.passwordCategory},  
                                {email: data.email}]});
                if(filter.length > 0){
                    res.render("editPassCategory",{msg : req.user, error :"Password Category already exist", id: data._id, val:""});
                 }
                else{
                    const data = await passCatModel.findByIdAndUpdate(req.body.id,{password_category:req.body.passwordCategory});
                    const newfilter = await passwordModel.findOneAndUpdate({$and: [{password_category: req.params.cat},  
                        {email: data.email}]},{password_category:req.body.passwordCategory});
                   console.log(newfilter);
                    res.redirect("/passwordCategory")
                }
        }

        else
        {
            res.render("editPassCategory",{msg : req.user, error :"Enter Password Category", id: data._id, val:""})
        }

        
    }

    
    



