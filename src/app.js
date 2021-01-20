const express = require ('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forcast = require('./utils/weather_forecast')
const forecast = require('./utils/weather_forecast')

const app = express()

//Define paths for Express config
const publicDirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../views')
const partialsPath = path.join(__dirname,'../views/partials')

//handlerbars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//static directory to serve
app.use(express.static(publicDirPath))

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather app',
        name: 'Patrick Chen'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About',
        name: 'SANA'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helpText:'This is some helpful text.',
        title: "help",
        name:'Patrick Chen'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: "Please provide an address"
        })
    }

    geocode(req.query.address,(error,{latitude,longtitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forcast(latitude, longtitude,(error,forecastData)=>{
            if (error){
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location,
                address: req.query.address
            })
        })
    })

    // res.send({
    //     forecast: 'The weather is nice',
    //     location: 'Taipei, Taiwan',
    //     address: req.query.address
    // })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Patrick Chen',
        ErrorMessage: 'Help Page not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Patrick Chen',
        ErrorMessage: "Web page not found!"
    })
})

app.listen(3000, ()=>{
    console.log('Server is up on port 3000.')
})