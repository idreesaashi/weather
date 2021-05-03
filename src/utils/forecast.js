var request = require ('postman-request')

var forecast = (latitude, longitude, callback) => {
    var queryParam = latitude + ',' + longitude
    var url = 'http://api.weatherstack.com/current?access_key=24fca61bdb6f880f4cdccb2468bdfe5b&query='+ encodeURIComponent (queryParam) 

    request({url, json:true}, (error, {body}) => {
        if (error) {
            callback ('Weather service not reachable!', undefined)
        } else if (body.error) {
            callback ('Issuse with the parameters!', undefined)
       } else {
           var weatherData =  {
               location: body.location.name,
               observationTime: body.current.observation_time,
               temperature: body.current.temperature,
               feelsLike: body.current.feelslike
           }
           callback (undefined, weatherData)
        }
    })
}

module.exports = forecast