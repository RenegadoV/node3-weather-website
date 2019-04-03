const request = require('request');

const geocode = (adress, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(adress) + '.json?access_token=pk.eyJ1IjoicmVuZXJkIiwiYSI6ImNqdHQwMmw5ZTAyd3M0Zm9mZmphMHk5Mm4ifQ.32HprM8mFkW4fYyTOIb5OQ&limit=1';
    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect.', undefined);
        }else if (body.features.length === 0) {
            callback('Unable to find the location.', undefined)
        } else {
            // const long = response.body.features[0].center[0];
            // const lat = response.body.features[0].center[1];
            // const name = response.body.features[0].place_name;
            const data = {
                long: body.features[0].center[1],
                lat: body.features[0].center[0],
                name: body.features[0].place_name
            }
            callback(undefined, data)
        }

    })
}

module.exports = geocode;