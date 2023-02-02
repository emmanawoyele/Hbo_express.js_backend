
const jwt = require('jsonwebtoken')
const createUsers =require('../DataBase/model/creatUser')
const auth= async(req,res,next)=>{
    let headertoken;
// in try catch, if there is no header with auth, use req.query coming fron the client
// turn the query into array by using Object keys and extract the first array
try{
 
    if(typeof req.header==="undefined"){
       return headertoken=`${Object.keys(req.query)[0]}`;
    }else{
        headertoken =req.header('Authorization').replace('Bearer ','')
    }
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