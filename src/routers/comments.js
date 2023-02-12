const express = require("express")
const ReadComments = require("../DataBase/model/readComments")
const auth =require('../middleware/Auth')
const router = new express.Router()
const fs = require('fs');
var cors = require('cors')


// CREATE

router.post("/comment",auth,async (req,res)=>{
 

    const new_comment=new ReadComments({...req.body,
      OwnerId:req.user._id})
      console.log(req.body)
    try{
      await new_comment.save();
      console.log(new_comment)
      res.status(201).send(new_comment)
    }catch(e){
  res.status(404).send("enter the correct information")
  
  
    }
  //   new_comment.save().then(()=>{
  // res.status(201)
  // res.send(new_comment)
  //   }).catch(()=>{
  // res.status(404).send("enter the correct information")
  //   })
  
  })
  
  
  
  // READ all comments
  
  
//   router.get("/comment", auth, async (req, res) => {
//     // res.set({
//     //     'Content-Type': 'text/event-stream',
//     //     'Cache-Control': 'no-cache',
//     //     'Connection': 'keep-alive'
//     // });

//     const sortdata = {}
//     if (req.query.sortBy) {
//         const parts = req.query.sortBy.split(":")
//         sortdata[parts[0]] = parts[1] === 'desc' ? -1 : 1
//     }

//     try {
//         const readusers = await ReadComments.find({OwnerId: req.user._id});
//         if(!readusers){
//          res.status(404)
//         }else{
//           res.status(201).send(readusers)
//         }
 
//         // send the initial data to the client
//         // res.write(`data: ${JSON.stringify(readusers)}\n\n`);

//         // set up an interval to send updates to the client
//         // const intervalId = setInterval(async() => {
//         //     const updatedData = await ReadComments.find({OwnerId: req.user._id});
//         //     res.write(`data: ${JSON.stringify(updatedData)}\n\n`);
//         // }, 3000);

//         // when the client closes the connection, clear the interval
//         // req.on("close", () => {
//         //     clearInterval(intervalId);
//         // });
//     } catch (e) {
//         res.status(404).send("There is no comments");
//     }
// });



router.get("/comment", auth, async (req, res) => {  
res.set({
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",

  });


  try {
    const readUsersComments = await ReadComments.find({});
    if (!readUsersComments) {
      return res.status(404).send("No comments found");
    }
    console.log({ert:readUsersComments})

    // Send the initial data to the client
    res.write(`data: ${JSON.stringify(readUsersComments)}\n\n`);

    // Set up an interval to send updates to the client
    const intervalId = setInterval(async () => {
      const updatedData = await ReadComments.find({});
      res.write(`data: ${JSON.stringify(updatedData)}\n\n`);
    }, 3000);

    // When the client closes the connection, clear the interval
    req.on("close", () => {
      clearInterval(intervalId);
    });
  } catch (error) {
    return res.status(500).send({error:error.message});
  }
});



  
  // READ SINGLE
  router.get("/comment/:id",auth, async(req,res)=>{
    const _id = req.params.id
console.log({usr:req.user})
    try{
      const readusers= await ReadComments.findOne({_id,OwnerId:req.user._id})
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
    const updated= await ReadComments.findOne({_id,OwnerId:req.user._id})
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

  router.delete('/comment/:id',auth,async(req , res)=>{
    const taskId =req.params.id
    console.log({taskId})
    console.log({owner:req.user._id})
    try{

    const taskDelete = await ReadComments.findOneAndDelete({_id:taskId,owner:req.user._id})
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