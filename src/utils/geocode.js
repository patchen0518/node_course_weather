const request = require('request')

const geocode = (address, callback)=>{
    const geocoding_url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiY2hlbjA1MTgiLCJhIjoiY2tpNDVkb3cwMDhhcDJxczV5ejVhZmZpciJ9.eqy-BXYyc6V-AaqtgcXHLA&limit=1'
    request({url:geocoding_url, json:true},(error, data)=>{
        if(error){
            callback('Unable to connect to location services!',undefined)
        } else if(data.body.features.length === 0){
            callback('location invalid!', undefined)
        } else{
            callback(undefined,{
                latitude: data.body.features[0].center[0],
                longitude: data.body.features[0].center[1],
                location: data.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode