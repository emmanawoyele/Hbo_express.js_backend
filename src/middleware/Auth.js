
const jwt = require('jsonwebtoken')
const createUsers =require('../DataBase/model/creatUser')
const auth= async(req,res,next)=>{
    let headertoken = req.header('Authorization')
    if(typeOf(headertoken) ==="undefined"){
headertoken =req.query
   console.log({see: headertoken})
        
    }else{
        
   headertoken.replace('Bearer ','')
    }
    console.log(headertoken)
try{

    const verifyJwt =  jwt.verify(headertoken,process.env.JWT_ENV)
    console.log(verifyJwt)
    const finduser= await createUsers.findOne({_id:verifyJwt._id , 'token.tokenid':headertoken})
    if(!finduser){
        throw new Error()
    }
    req.user=finduser
    console.log(finduser)
    next()
}catch(e){
    console.log(e)
    res.status(401).send("incorrect Auth")
}


}

module.exports=auth