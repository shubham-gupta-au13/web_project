const Usermodel = require("../model/userschema");
const passCatModel = require("../model/passwordCategory");
const passwordModel = require("../model/passwordDetail")

exports.getDashboard = async(req,res,next)=> {

    const data = await Usermodel.findById({_id: req.id});
    const totalPasswordCat = await passCatModel.find({email:data.email}).count();
    const totalPasswordDetails = await passwordModel.find({email:data.email}).count();
    res.render("dashboard",{msg : req.user,totalPasswordCat:totalPasswordCat,totalPasswordDetails:totalPasswordDetails});

}