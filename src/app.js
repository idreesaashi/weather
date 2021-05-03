var path = require ('path')

const { response } = require('express')
var express = require ('express')
var hbs = require ('hbs')
var geocode = require ('./utils/geocode')
var forecast = require ('./utils/forecast')
var app = express()

var staticPath = path.join (__dirname, '../public')
var viewPath = path.join (__dirname, '../templates/views')
var partialsPath = path.join (__dirname, '../templates/partials')


app.set ('view engine', 'hbs')
app.set ('views', viewPath)
hbs.registerPartials (partialsPath)

app.use(express.static (staticPath))

app.get ('', (req,res) => {
    res.render ('index', {
        title:'Weather App',
        developer: 'Idrees Aashi'
    })

})

app.get ('/about', (req,res) => {
    res.render ('about', {
        title:'About Weather App',
        developer: 'Idrees Aashi'
    })
})

app.get ('/help', (req,res) => {
    res.render ('help', {
        title:'Help on Weather App',
        developer: 'Idrees Aashi',
        helpText: 'This is a help text which completes the challenge'
    })

})
app.get ('/weather', (req, res) => {
    var searchAddress = req.query.address
    if (!searchAddress) {
        return res.send ({
            error: 'You must provide an address'
        })
    }
    
    geocode (searchAddress, (error, {latitude, longitude, location} = {} )=> {
        if (error) {
            return res.send ({
                error
            })
        }
        forecast (latitude, longitude, (forecastError, forecastData) => {
            if (forecastError) {
                return res.send ({
                    error
                })
            }

            res.send ({
                location,
                observationTime: forecastData.observationTime,
                temperature: forecastData.temperature,
                feelsLike: forecastData.feelsLike
            })
        })

    }) 
})

app.get ('/help/*', (req, res) => {
    //res.send('Help Article you are looking for is not available!')
    res.render ('error', {
        title:'Error Page !!!!',
        developer: 'Idrees Aashi',
        errorMessage: 'Help article not found!!'
    })
})

app.get ('*', (req, res) => {

    res.render ('error', {
        title:'404 Error !!!!',
        developer: 'Idrees Aashi',
        errorMessage: 'Page not found!!'
    })
})


app.listen (3100, () => {
    console.log ('Server running at port 3100')
})