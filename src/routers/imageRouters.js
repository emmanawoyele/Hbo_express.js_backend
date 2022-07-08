const express = require("express")
const Images = require("../DataBase/model/ImageModel")
const multer  = require('multer')

const auth =require('../middleware/Auth')
const router = new express.Router()

const upload = multer({ 

   
    fileFilter(req, file, cb){
      if(!file.originalname.match(/\.(jpg|png)$/)){
    return cb(new Error("please upload file with jpg or png"))
    
      }
      cb(undefined,true)
    // cb(new Error("file must be jpd"))
    // cb(undefined,true)
    } 
    })

// CREATE


router.post("/image",auth,upload.single('avatar') ,async (req,res)=>{
   console.log(req)
    const new_comment= new Images({image:req.user.image=req.file.buffer,OwnerId:req.user._id})
  
    try{
      await new_comment.save();
      res.status(201).send(new_comment)
    }catch(e){
  res.status(404).send({error:e})
  
    }
  
  },(error,req,res,next)=>{
    
    res.status(400).send({error:error.message})
  })
  

  router.get('/image/:id',auth,async(req,res)=>{
   const a= await req.User.findOne({...req.params.id,OwnerId:req.user._id})
    console.log(req.params.id)
    res.send(a)

  })
  
  
  // READ all comments
  
  
  router.get("/comment",auth, async(req,res)=>{  
  
    const sortdata={}
    if(req.query.sortBy){
    
      const parts = req.query.sortBy.split(":")
      console.log(parts)
      sortdata[parts[0]]=parts[1] ==='desc' ? -1 :1
      console.log(sortdata)
    } 
 
    try{
  // limit is use for pagination.limit helps us limit the number of request.
      const readusers= await ReadComments.find({ownerId:req.user._id}).limit(req.query.limit).skip(req.query.skip).sort(sortdata)
      res.status(201)
      res.send(readusers)
    }catch(e){res.status(404)
      res.send("There is no comments")}
  
  })
  
  // READ SINGLE
  router.get("/comment/:id",auth, async(req,res)=>{
    const _id = req.params.id
console.log({usr:req.user})
    try{
      const readusers= await ReadUser.findOne({_id,OwnerId:req.user._id})
      if(!readusers){
      res.status(404).send()
      }
      res.status(201).send(readusers)
    }catch(e){res.status(404)
      res.send("There is no comments")}
  
  })
  
  
  // UPDATE
  
  
  
  router.patch('/comment/:id',auth,async(req,res)=>{
  const _id = req.params.id
  const updates= Object.keys( req.body)
  try{
    const updated= await ReadUser.findOne({_id,OwnerId:req.user._id})
    if(!updated){
      res.status(400).send()
    }
    updates.forEach((comments)=>{
return updated[comments]=req.body[comments]
    })
    await updated.save()

  res.send(updated)}catch(e){
    res.send()
  }
  })
  
  // delete a comment

  router.delete('/comment/:id',auth,async(req,res)=>{
    const taskId =req.params.id
    console.log({taskId})
    try{
      // const find_User = await ReadUser.findOne({id:req.params.id,owner:req.user_id})
      // console.log(find_User)
      // const taskDelete = await ReadUser.deleteOne(find_User)
      // or
    const taskDelete = await ReadUser.findOneAndDelete({id:taskId,owner:req.user._id})
    if(!taskDelete){
        return res.status(404)
    }else{

        res.send("comment is deleted")
    }
    }catch(e){
    res.status(500).send(e)
    }
    
    })
    
  

  
  
  module.exports= router