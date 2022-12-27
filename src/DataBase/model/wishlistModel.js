const mongoose =require("mongoose")
 const validator = require('validator');
 const bcrypt = require('bcryptjs');
 const jwt = require('jsonwebtoken')


 const useschema= new mongoose.Schema({
  MediaBackdrop:{ type:String
  },
  MediaUrl:{
    type:String,
    trim:true
},
linkUrl:{
  type:String,
  trim:true
},
location:{
  type:String,
  trim:true
},
mediaId:{
  type:String,
  trim:true
},

mediaType:{
  type:String,
  trim:true
},
movieTitle:{
  type:String,
  trim:true
},
type:{
  type:String,
  trim:true
},   OwnerId:{
  type:mongoose.Schema.Types.ObjectId,
  required:true,
  ref:'Useraccount'
}
 },{timestamps:true})
 // statics is use to findByCrenetials function can be accessible(for logging) A middleware
useschema.statics.checkdoublemovies=async(data,OwnerId)=>{


//  console.log({id})

  let doublemovies
     let movies =await WishListMovie.find(data,OwnerId)
     movies.forEach((films)=>{
      console.log({films})

      if( films.mediaId.includes(data.req.mediaId)===false){
         return data
      }else{
        console.log("corect")
        throw new Error("Double movies")
      }
     })
   

  }

 const WishListMovie=mongoose.model("WishList", useschema)



module.exports=WishListMovie