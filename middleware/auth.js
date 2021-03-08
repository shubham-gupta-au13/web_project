var Usermodel = require("../model/userschema");
const jwt = require("jsonwebtoken");
const userModel = require("../model/userschema");

const auth = async function(req,res,next){
    try{
        const token = req.cookies.jwt;
        const verifyUser = jwt.verify(token,process.env.SECRET_KEY)
        const user = await userModel.findOne({_id : verifyUser._id})
        req.user = user.userName;
        req.id = user._id;
        req.tokens = user.tokens; 
        next()

    }
    catch(e){
        console.log("bye");
        res.status(401).redirect("/");
    }
}
module.exports = auth