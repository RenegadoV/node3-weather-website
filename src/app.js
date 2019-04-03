const path = require('path')
const express = require('express')
const hbs = require('hbs')

// Requiring my own modules
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirPath =  path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Set handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Load Static content
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Rene Vergara'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        body: 'How may I about you?',
        name: 'Rene Vergara'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        body: 'How may I help you?',
        name: 'Rene Vergara'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.adress) {
        return res.send({
            error: 'Please provide an adress.'
        })
    }
    geocode(req.query.adress, (error, {long, lat, name} = {}) =>{
        if (error) {           
            return res.send({ error })
            
        } 
        forecast({long, lat, name}, (error, {summary, temp, precip, name}) => {
            if (error) {
                return res.send({ error })
            } 
            res.send({
                name, long, lat, summary, temp, precip
            })
                       
        })
        
    })
    
    // res.send({
    //     adress: req.query.adress,
    //     weather: 'This is some static weather'
    // })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Search termn missing.'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        name: 'Rene Vergara',
        title: 'HELP 404',
        body: 'Help not found'
    })
})


app.get('*', (req, res) => {
    res.render('404', {
        name: 'Rene Vergara',
        title: 'Absolute 404',
        body: 'Nothing was found'
    })
})

app.listen(3000, () =>{
    console.log('Server is up and running on port 3000')
})