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
    //  for(var i=0 ; i<movies.length;i++){
    //   console.log(movies.length)
  
    //   console.log({datacomingfromdata:data.req.mediaId})
    //  if( !movies.mediaId.includes(data.req.mediaId)===true){
    
    //   return movies[i]
      
    //  }else{
    //   console.log("coorect")
    //   throw new Error("Double movies")
      
     
    //  }
    //  }
  //  if(movies.mediaId.includes(data.mediaId)===false){
  // return movies
  //  }
    //  for(var i = 0 ; i< movies.length;i++ ){
    //   if(movies[i].mediaId.includes(data.mediaId)===true){
    //     console.log(movies[i].mediaId)
    //   }

    //  }
      
      // if(movies.includes(!movies.mediaId=== true)){
      //    console.log(movies.mediaId)
      //   return null
      // } else{
      //   console.log({de:movies})
      //   return movies
      // }
      // return movies
//       movies.forEach((movies)=>{
// console.log(movies.mediaId)
//       })
      // movies.filter((movies)=>{
      //   if(movies.mediaId!==movies.mediaId){
      //     return movies.mediaId
      //   }
  
      // console.log({movies})

      // })

  // if(!movies ){
  //  throw new Error("Double movie can't be added")
  // }
  // const isMatched = await bcrypt.compare(password,user.password)
  // if(!isMatched){
  //   throw new Error("Unable to log in")
  // }

  }

 const WishListMovie=mongoose.model("WishList", useschema)



module.exports=WishListMovie