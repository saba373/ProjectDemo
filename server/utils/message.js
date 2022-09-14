var generateMessage = (from,mytext) => {
return{
    
    from,
    mytext,
    createdAt: new Date().getTime()
  }
}

var generateMessageLocation = (from,latitude,longitude) => {
    return{
        from,
        url: `https://www.google.com/maps?q=${latitude},${longitude}`,
        createdAt: new Date().getTime()
      }
    }
    

module.exports = {generateMessage,generateMessageLocation}