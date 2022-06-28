const mongoose =require("mongoose")
//  const validator = require('validator')
const useschema= new mongoose.Schema({
    comments:{
        type:String,
        required:true,
        trim:true
    },
    OwnerId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Useraccount'
    }
},{
    timestamps:true
})
 
 const ReadComments=mongoose.model("Comments", useschema)

 module.exports=ReadComments