const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title:'weather app',
        name:'kolawole olaniyi'
    })
})

app.get('/help', (req, res) => {
res.render('help', {
    helpText: 'Some tips to help you get started with our app',
    help: 'You can get all the help you need here',
    title:'Help page',
    name: 'kolawole olaniyi'
  })
})

app.get('/about', (req, res) => {
    res.render('about', {
        name:'Kolawole olaniyi',
        title:'About Me'
    })
})

app.get('/weather', (req, res) => {

    if(!req.query.address){
       return res.send({
            error: 'You must provide an Address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
           return res.send({
                error
            })
        } 

        forecast(latitude, longitude, (error, data) => {
            if(error){
               return res.send({
                     error
                })
            } 

            res.send({
                forecast: data,
                location: location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
       return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
   res.render('404', {
       title : '404 Page',
       name: 'Kolawole olaniyi',
       errorMessage : 'Help Article Not Found'
   })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        name: 'Kolawole olaniyi',
        errorMessage: 'Page Not Found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})