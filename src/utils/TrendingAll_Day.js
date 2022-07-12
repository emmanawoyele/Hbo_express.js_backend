const request = require('request')
const shuffle=require('./shuffleArray')

const trending_all_day=(trending,callback)=>{
    
   console.log({trending})
    const trendingalldayUrl=`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.MOVIEDB_API_KEY}`

    request({url:trendingalldayUrl,json:true},(error,response)=>{
       

if(error){
   callback('nothing for the boys') 
}else{
    
callback(undefined,{response:response.body.results})
}

    })
}

module.exports= trending_all_day

