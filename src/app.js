const express = require("express")
const app= express()
var cors = require('cors')
const trending_all_day =require("./utils/TrendingAll_Day")
const videoTrending = require("./utils/videoTrending")
require('./DataBase/mongoose')
const ReadUser =require('./DataBase/model/readComments')
const useCreateUserRouter=require('./routers/createUsers')
const useCommentsRouter=require('./routers/comments')
const useImagesRouter=require('./routers/imageRouters')
const port=process.env.PORT || 3000

app.use(express.json())
app.use(cors({origin: true, credentials: true}));
app.use(useCreateUserRouter)
app.use(useCommentsRouter)
app.use(useImagesRouter)


app.get("/",(req,res)=>{
console.log(req.query)
 
    console.log(req.query)
    debugger
    if(!req.query){
      console.log({myrequest:req.query})
     return res.send(req.query)
  
    }
    trending_all_day(req.query,(error,{response})=>{
      if(error){
      res.send(error)
      }else{
      
        videoTrending(response,(shuffeldCallback={})=>{
          console.log({shuffeldCallback})
          res.send(shuffeldCallback)
        })
      }
      
          })
 
})

app.listen(port,()=>{
    console.log(`Server listen on ${port}`)
})

// const multer=require('multer')
// const upload = multer({dest:'images'})
// app.post('/upload',upload.single('avatar'),(req,res,next)=>{
//   res.send()
//   next()

// })