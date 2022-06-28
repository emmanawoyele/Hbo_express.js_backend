const mongodb = require('mongodb');
 const MongoClient = mongodb.MongoClient
 const connectionUrl ="mongodb://127.0.0.1:27017"
const databaseName ="myMovieDB"
const Object=mongodb.ObjectId
const getNewId = new Object('626647bb83e0726bb1a8d2a1')
console.log(getNewId.getTimestamp())
MongoClient.connect(connectionUrl,{useNewUrlParser:true},(error,client)=>{
if(error){
    return console.log('unable to connect')
}
console.log("connected correctly")
const movieDb=client.db(databaseName).collection('MovieList')
movieDb.deleteOne({
    _id:getNewId
}).then((result)=>{
    console.log(result)
}).catch((error)=>{
    console.log(error)

})
// movieDb.updateOne({_id:getNewId},{$set:{
//     Title:"The boys are coming"
// }}).then((result)=>{
//  console.log(result)
// }).catch((error)=>{
//     console.log(error)
// })

// movieDb.insertOne({
//     Movie_id:getNewId,
//     Title:"The Church",
//     rating:100,

// },(error,results)=>{
// if(error){
//     return console.log("error")
// }
// console.log(results.insertedId)
// })

// movieDb.insertMany([{title:"dead king",rating:50},{title:"boys top ",rating:100}],(error,results)=>{
//     if(error){
//         return console.log(error)
//     }
//     console.log(results.insertedIds)
// })

// movieDb.findOne('62663c53134f6ce70f0ce4b8',(undefined,res)=>{
// if(undefined){
// return console.log("not defined")
// }
// console.log(res)
// })
})
