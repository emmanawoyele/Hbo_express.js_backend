const mongoose =require("mongoose")
 const validator = require('validator');
 const bcrypt = require('bcryptjs');
 const jwt = require('jsonwebtoken')
const Comments = require("../model/readComments")


 const useschema = new mongoose.Schema({
  firstname:{
      type:String,
      trim:true
  },
  lastname:{
    type:String,
    trim:true
},
  username:{
    type:String,
    required:true,
    trim:true,
    set:(value)=>{
      if(value === value.toLowerCase()){
        return value.charAt(0).toUpperCase() + value.slice(1);
    }else{
     return  value
    }
  }
    
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
  
  const user =this
const genToken = jwt.sign({_id:user._id.toString()},process.env.JWT_ENV)
user.token=user.token.concat({tokenid:genToken})
await user.save()
return genToken
}
// generate random usernames
useschema.statics.userNameSuggestion =async function(data){
  const{username,firstname,lastname}=data
  // create empty array
  const names = []
  let arrayOfNumber=[]
  // push firstname and lastname into array
  names.push(firstname ,lastname)
  // join firstname and lastnames and .
 const joinNames=names.join(".")

 for(var i=0;i<5;i++){
 const genRandomNumbers =Math.floor(Math.random()*100)
 const joinNamesAndNumbers =`${username}${genRandomNumbers}`
 const firstnameLastname= `${joinNames}${genRandomNumbers}`
 console.log(firstnameLastname)
 arrayOfNumber.push(joinNamesAndNumbers,firstnameLastname)

 }

 return arrayOfNumber

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

let user 
let emailOrUsername =data.body.email;
if(data.body.email ||data.body.username){
  user =await User.findOne({$or:[{email:emailOrUsername},{username:emailOrUsername}]})

}

if(!user){
 throw new Error("Check Your Username or Password")
}
const isMatched = await bcrypt.compare(password,user.password)
if(!isMatched){
  throw new Error("Unable to log in")
}

return user
}

// useschema.statics.checkCredentialsInDatabase=async(data,password)=>{

//   let user 
 
//     user =await User.findOne({$or:[{username:data.username}]})
//   console.log({checking:user})
//     if(!user){
//       return data  
//     }else{
//       throw new Error("Check Your Username or Password")
//     }
  
//   // if(!user){
//   //  throw new Error("Check Your Username or Password")
//   // }
 
//   // if(!isMatched){
//   //   throw new Error("Unable to log in")
//   // }
  
  
//   }

// Hash the User passoword before saving A middleware
useschema.pre('save',async function(next){
const user=this
// console.log({userid:user})
if(user.isModified("password") ){
user.password=await bcrypt.hash(user.password,8)
}
next()
})
/* The code uses the this keyword to access the User document being deleted.
 It then uses the deleteMany() method of the Comments model to delete 
 all comments that have a matching "OwnerId" field with the user being deleted. 
 Finally, it calls the next() method to indicate that the middleware function has completed*/
useschema.pre('deleteOne',{ document: true },async function(next){
  const user =  this
  // console.log({userremove:user})
await Comments.deleteMany({OwnerId:user._id})
next()
})

 const User=mongoose.model("UserProfile", useschema)



module.exports=User