const mongoose = require("mongoose");
const url = 'mongodb://shubham:hSqAHicQ5vTbSyL1@cluster0-shard-00-00.xrs5c.mongodb.net:27017,cluster0-shard-00-01.xrs5c.mongodb.net:27017,cluster0-shard-00-02.xrs5c.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-wvhj62-shard-0&authSource=admin&retryWrites=true&w=majority'

const initDB = async function(){

    try{
        await mongoose.connect(url,{useNewUrlParser: true,useUnifiedTopology: true});
        console.log("DataBase is connected suceessfully")
    }
    catch(e){
        
        console.log(e)
    }
 


}

module.exports = initDB;
