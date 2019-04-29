
const request = require('request');
const geocode = (address, callback) => {
    const url =  `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoia29sbml5IiwiYSI6ImNqdWU4bHp5OTAwdjA0M3AzemN6eHp5cW0ifQ.4nXceL9Ey_nS4PmLLE_T6w`

    request({url, json:true}, (error, {body} = {}) => {
        if(error){
         callback('Unable to contact geocode service', undefined)
        } else if(body.features === undefined || body.features.length === 0) {
            callback('Please input a valid location', undefined)
        } else {
           callback(undefined,
                {'latitude' : body.features[0].center[1],
                'longitude': body.features[0].center[0],
                'location': body.features[0].place_name
            })
        }
    })
    
}


module.exports = geocode

