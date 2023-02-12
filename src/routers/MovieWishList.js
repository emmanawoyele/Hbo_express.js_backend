const express =require('express')
const auth = require('../middleware/Auth')
const MovielistDb = require('../DataBase/model/wishlistModel')
const { findById } = require('../DataBase/model/wishlistModel')
const router= new express.Router()

// add new movies
router.post("/movie",auth,async(req, res)=>{


    try{
    const movieList=await MovielistDb.checkdoublemovies({req:req.body,OwnerId:req.user._id})
  await movieList .save();
      return res.status(201).send(movieList)
    }catch(e){
    
res.status(400)
res.send("Movie already existed.Check your libabry")
    }


})

// get list of added movies
router.get("/movie/wishlist",auth, async(req, res)=>{
  const usersMovies= await MovielistDb.find({OwnerId:req.user._id})
  res.send(usersMovies)
  

})
// delete movies
router.delete("/movie/wishlist/:id",auth, async(req, res)=>{

  const _id =req.params.id

  console.log({_id})
  try{
   const users=await MovielistDb.findByIdAndDelete({_id})
   console.log(users)
   if(users!==null){
    return res.status(200).send(users)
   }else{
   return res.status(404).send("No movie found")
   }
   
    
  }catch(e){
    res.status(500)
    res.send()
  }
  })
module.exports= router