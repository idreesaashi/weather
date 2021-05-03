console.log ('Client side script loaded')



var weatherForm = document.querySelector ('form')
var searchAddress = document.querySelector ('input')
var weatherContent = document.querySelector ('#weather-content')

weatherForm.addEventListener ('submit', (e) => {
    e.preventDefault()
    var location = searchAddress.value

    fetch ('/weather?address=' + location).then ((response) => {
    response.json().then ((data) => {
        if (data.error) {
            console.log (data.error)
            weatherContent.textContent = data.error
        } else {
            console.log (data)
            weatherContent.textContent = 'Current temperature for ' + data.location + ' is ' + data.temperature + ' degrees. Thought it feels like ' 
                + data.feelsLike + ' degrees outside.'
        }
        
    })
})

})