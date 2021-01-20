const request = require('request')


const forecast = (latitude, longtitude, callback)=>{
    const weatherstack = 'http://api.weatherstack.com/current?access_key=defa4f7e1f45919d4b0736c817e76016&query='+ latitude +','+longtitude
    request({url:weatherstack, json:true},(error,infor)=>{
        if(error){
            callback('unable to connect to the weather service!',undefined)
        }else if (infor.body.error){
            callback('Unable to get the location weather!',undefined)
        } else{
            callback(undefined,console.log('%s. It is currently %s degrees out. The weather feels like %s degrees out', infor.body.current.weather_descriptions[0],infor.body.current.temperature,infor.body.current.feelslike))
        }
    })
}

module.exports = forecast