//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)
const request = require('request');

const forecast = ({long, lat, name}, callback) => {
    const url = 'https://api.darksky.net/forecast/48e40906bb3c6d14c10a4572648eb7e9/' + encodeURIComponent(long)+ ','+ encodeURIComponent(lat) +'?units=si'
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Failed to connect to DarkSky', undefined)
        } else if (body.error){
            callback('Invalid location', undefined)
        } else {
            const data = {
                name,
                summary: body.daily.data[0].summary,
                temp: body.currently.temperature,
                precip: body.currently.precipProbability
            }
            callback(undefined, data)
        }
    })
}

module.exports = forecast;