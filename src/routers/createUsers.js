const express =require('express')
const sharp = require('sharp')
const User =require('../DataBase/model/creatUser')
const auth = require('../middleware/Auth')
const Multer = require('multer')

const router= new express.Router()

const upload = Multer({ 

limits:{
  // fileSize:1000000,
  
},
fileFilter(req, file, cb){
 
  if(!file.originalname.match(/\.(jpg|jpeg|png|pdf)$/)){
return cb(new Error("please upload file with jpg or png"))

  }
  cb(undefined,true)
// cb(new Error("file must be jpd"))
// cb(undefined,true)
} 
})

// create user account
router.post("/create",async (req,res)=>{
 
console.log(req)
    const createNewUser= new User(req.body)
    try{
      await createNewUser.save()
    const token = await createNewUser.generateToken()
   res.status(201).send(createNewUser)
    }catch(e){
     res.status(400).send(e)
    }
   
   
   
   })
  //  login
  router.post("/create/login",async(req ,res)=>{
    
try{
const user =  await User.findByCrendetials(req.body.email,req.body.password)
const token = await user.generateToken()


  return res.status(200).send({user,token})
}catch(e){
  console.log(e)
res.status(400).send('unable to log in')
}
  })

// get profile
   router.get("/create/me",auth , async (req,res)=>{
   res.send(req.user)
   
   })
  //  upload files for profile
  
  // const erroMiddleware=(req,res,next)=>{
  //    throw new Error('Please upload Png or Jpg')
  //   next()
  // }

  router.post('/create/profileimage',auth,upload.single('avatar'),async(req,res)=>{  
    console.log(bufferImage)  
const bufferImage = await sharp(req.file.buffer).resize({width:300,height:300}).jpeg().toBuffer()

    try{
// req.user.avatar.concat({image:req.file.buffer})
req.user.avatar=bufferImage
  await req.user.save()
 res.send(req.user)


}catch(error){
  res.status(505)
}
  
  },(error,req,res,next)=>{
    
    res.status(400).send({error:error.message})
  })

  // get and render avatar
  router.get('/create/profileimage/:id/avatar',async(req,res)=>{
    const id= req.params.id
    
try{
 const getUser= await User.findById(id)
 if(!getUser ||!getUser.avatar){
throw new Error()
 }
res.set('Content-Type','image/jpeg')
res.send(getUser.avatar)}
catch(e){
res.status(404)
}
  })

  router.delete('/create/me/profileimage',auth,async(req,res)=>{
    req.user.avatar =undefined
    await req.user.save()
       res.send(" Image delete")

   }
)

  // uodate user profile
    router.patch('/create/me',auth,async(req, res)=>{
      console.log(req.body)
      console.log(Object.values(req.body))
        const updates= Object.keys( req.body)
        console.log({updates})
        try{

        // const updated =await User.findByIdAndUpdate(_id,req.body,{new:true,runValidators:true})
        const updated =await User.findByIdAndUpdate(req.user)
        
        updates.forEach((update)=>{
           return  updated[update]=req.body[update]
        })
           await updated.save()
        if(!updated){
          return res.status(400).send()
        }
        
        res.send(updated)}catch(e){
            console.log(e)
          res.status(500)
          res.send()
        }
        })
        //log out profile
        router.post('/create/logout',auth,async(req, res)=>{
          console.log({1:req.user.token})
          try{
            req.user.token=req.user.token.filter((token)=>{
              console.log(token)
              const returnedToken =token.token!==req.token
            return   returnedToken
            })
            
            
            await req.user.save()
          res.send()
          }catch(e){
            res.status(500)

          }
      //     try{
      //       req.user.tokens=req.user.tokens.filter((token)=>{
      // return token.token !==req.token
      //       })  
      //       await req.user.save()
      //       res.send()
      //     }catch(e){
      // res.status(500).send()
      //     }



        })

        // log out all section

        router.post('/create/logout/all',auth,async(req,res)=>{
          console.log({all:req.user.token})
          try{
            req.user.token=[]
            await req.user.save()
            res.send("all user log out")
          }catch(e){
           res.status(500).send()
          }

        })
        // delete profile
        router.delete("/create/me",auth, async(req, res)=>{

            const _id =req.user
            console.log({_id})
            try{
             const users=await req.user.deleteOne({})
              res.status(200)
              res.send(req.user)
            }catch(e){
              res.status(500)
              res.send()
            }
            })
             
                   
 module.exports= router