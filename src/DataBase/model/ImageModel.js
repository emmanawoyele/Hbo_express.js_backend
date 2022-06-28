const mongoose =require("mongoose")

const useschema= new mongoose.Schema({
   
    image:{ type:[Buffer]},
    OwnerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Useraccount'
    }
},{
    timestamps:true
})
 
 const UseImage=mongoose.model("image", useschema)

 module.exports=UseImage