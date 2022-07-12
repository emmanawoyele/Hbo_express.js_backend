const request = require("request")
const shuffleArray = require('../utils/shuffleArray')

const videoTrending=(key,callback)=>{
  // console.log({key})
    let videoKey=[];
    const Default={
      iso_639_1: 'en',
      iso_3166_1: 'US',
      name: 'What Else Can I Do?',
      key: 'PnJY20UCH9c',
      site: 'YouTube',
      size: 1080,
      type: 'Clip',
      official: true,
      published_at: '2021-12-13T21:54:56.000Z',
      id: '61b7d50b037264001cadc6e1'
    }


  const video=  key.forEach((key)=>{
videoKey.push(key.id)
    })

   // Shuffle array and return 1 item
  // function shuffle(array) {
    
  //   let currentIndex= array.find((array)=>{
  //     return array.offical!=false 
  //   })
    
  //    currentIndex= array.length

  //   let randomIndex;
    
  //   // While there remain elements to shuffle...

  //   while (currentIndex != 0) {

  //     // Pick a remaining element...
  //     randomIndex = Math.floor(Math.random() * currentIndex);

  //     currentIndex--;

  //     // And swap it with the current element.
  //     [array[currentIndex], array[randomIndex]] = [
  //       array[randomIndex], array[currentIndex]];
  //   }
    
   
  //   return array[0];
  // }
// 
   const shuffledKey=shuffleArray(videoKey)
 
console.log({shuffledKey})
    const videoTrendingurl =`https://api.themoviedb.org/3/movie/${shuffledKey}/videos?api_key=${process.env.MOVIEDB_API_KEY}&language=en-US`
request({url:videoTrendingurl,json:true},(error,response)=>{

try{

  console.log({responseVideo:response.body})
  console.log({responseVideo2:response.body.success})
  debugger

  // if(response.body.hasOwnProperty("result")||response.body===null ){}
  if(response.body.results.length ===0 ) {
    console.log("body is empty")
   return callback(Default)
  }
else{
    console.log({videoTredingurl:response.body.results})
    const shuffeldCallback=shuffleArray(response.body.results)

callback(shuffeldCallback)
  }

}catch(e){
if (response.body.success===false)

return callback(Default)
  

}



})
}

module.exports=videoTrending