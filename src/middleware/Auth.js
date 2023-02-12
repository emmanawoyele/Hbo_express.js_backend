
const jwt = require('jsonwebtoken')
const createUsers =require('../DataBase/model/creatUser')
const auth= async(req,res,next)=>{
    let headertoken;
// in try catch, if there is no header with auth, use req.query coming fron the client
// turn the query into array by using Object keys and extract the first array
try{
   
    if(typeof req.header('Authorization')==="undefined"){
       headertoken =  req.query.token 
    }else if( req.header("Authorization")){
       
       headertoken =  req.header("Authorization").replace('Bearer ','')
    }
    
    const verifyJwt =  jwt.verify(headertoken,process.env.JWT_ENV)
    const finduser= await createUsers.findOne({_id:verifyJwt._id , 'token.tokenid':headertoken})
    if(!finduser){
        throw new Error()
    }
    req.user=finduser
    next()
}catch(e){
   
    res.status(401).send("incorrect Auth")
}


}

module.exports=auth