const mongoose =require("mongoose")
//  const validator = require('validator')
const useschema= new mongoose.Schema({
    comments:{
        type:String,
        required:true,
        trim:true
    },
    Title:{
        type:String,
        trim:true

    },
    movieId:{
        type:Number
    },
    OwnerId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'UserProfile'
    }
},{
    timestamps:true
})
 
 const ReadComments=mongoose.model("Comments", useschema)

 module.exports=ReadComments