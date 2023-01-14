const mongoseConnect =require('./DataBase/mongoose')

const express = require("express")
const app= express()
const port=process.env.PORT || 3000
var cors = require('cors')
const trending_all_day =require("./utils/TrendingAll_Day")
const videoTrending = require("./utils/videoTrending")
const ReadUser =require('./DataBase/model/readComments')
const useCreateUserRouter=require('./routers/createUsers')
const useCommentsRouter=require('./routers/comments')
const useImagesRouter=require('./routers/imageRouters')
const useMovieWishList=require('./routers/MovieWishList')

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true
}
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_ENV);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}
app.use(express.json())
app.use(cors(corsOptions)); 
app.use(useCreateUserRouter)
app.use(useCommentsRouter)
app.use(useImagesRouter)
app.use(useMovieWishList)

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

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server listen on ${port}`)
  })
})
// app.listen(port,()=>{
//     console.log(`Server listen on ${port}`)
// })

// const multer=require('multer')
// const upload = multer({dest:'images'})
// app.post('/upload',upload.single('avatar'),(req,res,next)=>{
//   res.send()
//   next()

// })