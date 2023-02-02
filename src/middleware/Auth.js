
const jwt = require('jsonwebtoken')
const createUsers =require('../DataBase/model/creatUser')
const auth= async(req,res,next)=>{
    console.log({kiss:req.query})
    
try{
    const headertoken = req.header('Authorization').replace('Bearer ','')
    if(!req.header){
const head = req.query.replace('Bearer ','')
const verifyJwt =  jwt.verify(head,process.env.JWT_ENV)
console.log(verifyJwt)
const finduser= await createUsers.findOne({_id:verifyJwt._id , 'token.tokenid':head})
if(!finduser){
    throw new Error()
}
req.user=finduser
console.log(finduser)

    }
    console.log(headertoken)
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