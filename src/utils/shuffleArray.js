const ShufflArray = array => {
       
    let currentIndex= array.find((array)=>{
      
        return !array.official===false 
      })
      
       currentIndex= array.length
  
      let randomIndex;
      
      // While there remain elements to shuffle...
  
      while (currentIndex != 0) {
  
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
  
        currentIndex--;
  
        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex], array[currentIndex]];
      }
      
     
      return array[0];
};

module.exports= ShufflArray

