const request = require('request');

const getForeCast = (lat, long, callback) => {
    const url = `https://api.darksky.net/forecast/cad065fb0a176f2b190c5833e94ba897/${lat},${long}`;
    request({url, json:true}, (error, { body }) => {
        if(error){
            callback('Unable to connect with forecast service', undefined);
        } else if(body.error){
            callback('Cannot get Forecast for that location', undefined);
        } else {
            callback(undefined, `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability}% chance of rain`)
        }
    })
}

module.exports = getForeCast 

