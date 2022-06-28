const request = require("request")
const shuffleArray = require('../utils/shuffleArray')

const videoTrending=(key,callback)=>{
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
   console.log({video})
   console.log({videoKey})
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
 
    // console.log({videoKey})
    const videoTrendingurl =`https://api.themoviedb.org/3/movie/${shuffledKey}/videos?api_key=a5879fe83cace23de294d0b28bb346d5&language=en-US`
request({url:videoTrendingurl,json:true},(error,response)=>{

  console.log({error})
  console.log(response.body.results)
  if(response.body.results.length===0||response.body.results==='undefined'){
    console.log({videoTredingurl:response.body.results})

    callback(Default)
  }else{
  
    const shuffeldCallback=shuffleArray(response.body.results)
debugger
callback(shuffeldCallback)
  }


})
}

module.exports=videoTrending