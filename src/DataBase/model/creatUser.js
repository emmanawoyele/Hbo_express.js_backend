const mongoose =require("mongoose")
 const validator = require('validator');
 const bcrypt = require('bcryptjs');
 const jwt = require('jsonwebtoken')
const Comments = require("../model/readComments")


 const useschema = new mongoose.Schema({
  name:{
      type:String,
      trim:true
  },
  username:{
    type:String,
    required:true,
    trim:true
},
email:{
  type:String,
  unique:true,
  required:true,
  trim:true,
  validate(value){
      if(!validator.isEmail(value)){
          throw new Error('Email is not valid')
      }
  }

},
  password:{
    type:String,
    required:true,
    trim:true,
    validate(value){
      if(value.includes('password')){
        throw new Error("cant contain password")
      }else if(value.length<7){
        throw new Error(" password must be more than 7 characters")
      }
     
    }
  },
  token:[{
    tokenid:{
      type:String,
      required:true
    }

  }],
  avatar:{ type:Buffer}
    

    
 
 
},{timestamps:true})
// foreignField "AuthorId referencing readcomments model "AuthorId"
useschema.virtual('commentsRelationship',{
  ref:"Comments",
  localField:"_id",
  foreignField:"OwnerId"
})
// generate token
useschema.methods.generateToken =async function(){
  console.log({this:this})
  const user =this
const genToken = jwt.sign({_id:user._id.toString()},process.env.JWT_ENV)
user.token=user.token.concat({tokenid:genToken})
await user.save()
return genToken
}


// Hide some user creditials
useschema.methods.toJSON=function(){
  const user =this
  const userObject =  user.toObject()
    delete userObject.password
  delete userObject.token
  delete userObject.avatar
  return userObject
}
// statics is use to findByCrenetials function can be accessible(for logging) A middleware
useschema.statics.findByCrendetials=async(data,password)=>{


let user;

if(data.body.email){
  user =await User.findOne({email:data.body.email})
return user

}else if(data.body.username){
  user =await User.findOne({username:data.body.username})
  return user
}

if(!user){
 throw new Error("Unable to log in")
}
const isMatched = await bcrypt.compare(password,user.password)
if(!isMatched){
  throw new Error("Unable to log in")
}

return user
}
// Hash the User passoword before saving A middleware
useschema.pre('save',async function(next){
const user=this
// console.log({userid:user})
if(user.isModified("password") ){
user.password=await bcrypt.hash(user.password,8)
}
next()
})
// 
useschema.pre('deleteOne',{ document: true },async function(next){
  const user =  this
  // console.log({userremove:user})
await Comments.deleteMany({OwnerId:user._id})
next()
})

 const User=mongoose.model("UserProfile", useschema)



module.exports=User