'use strict';
/////////////////get the express function\\\\\\\\\\\\\\\\\\

const express = require('express') 

/////////////////get the cors functions\\\\\\\\\\\\\\\\\

const cors = require('cors')

/////////////////get the dotenv function\\\\\\\\\\\\\\\

require('dotenv').config();

/////////////////calling the express finction\\\\\\\\\\\\\\\\\\

const app = express();

////////////////calling cors function\\\\\\\\\\\\\\\

app.use(cors());

///////////////creat a port number\\\\\\\\\\\\\\\

const PORT = process.env.PORT || PORT


/////////////////////lestining to the port\\\\\\\\\\\\\\\\\\\\

app.listen(PORT, ()=>{
    
    console.log(`Listening to port ${PORT}`);
    
})


/////////////////////////////create a location route\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

app.get('/location',(Request,Response)=>{

    const geoData = require('./data/geo.json');
    const city = Request.query.city;
    const newLocation = new AllLocation(city,geoData)
    Response.send(newLocation)

})

/////////A constructor crating an objects of cities locations\\\\\\\\\\\

function AllLocation (city,geoData){

    this.search_query = city;
    this.search_query = 'Washington',
    this.display_name = geoData[0].display_name,
    this.latitude = geoData[0].lat,
    this.longitude = geoData[0].lon
}





///////////////////////////////////create a weather route\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

let arrWeather = [];

app.get('/weather',(Request,Response)=>{

    const weatherData = require('./data/weather.json');
    const cityWeather = Request.query.city;
    arrWeather = [];
    const newWeather = new Allweather(cityWeather,weatherData)
    Response.send(arrWeather)

})

///////////////A constructor crating an objects of weathers\\\\\\\\\\\\\\\

function Allweather (cityWeather,weatherData){
    
    this.search_query = cityWeather;
    
    for(let i = 0 ; i < weatherData.data.length  ;i++){

        this.forecast = weatherData.data[i].weather.description,

        this.time = weatherData.data[i].valid_date

        arrWeather.push(this)
    }
}
   


/////////////////////////////create an error route\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

app.get('*',(Request,Response)=>{

    
    Response.status(500).send('Page Not Found')

})



    