'use strict';

////////get the express function\\\\\\\\\

const express = require('express')

///////get the cors functions\\\\\\\\\\\

const cors = require('cors')

//////get the dotenv function\\\\\\\\\\\\

require('dotenv').config();

//////get the superagent function\\\\\\\\\\\\

const superagent = require('superagent')

////////calling the express finction\\\\\

const app = express();

/////////calling cors function\\\\\\\\\\\

app.use(cors());

//////////creat a port number\\\\\\\\\\\\

const PORT = process.env.PORT || PORT


/////////lestining to the port\\\\\\\\\\\\

app.listen(PORT, () => {

    console.log(`Listening to port ${PORT}`);

})


///////////////////////////////////////////(1)create a location route\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

//(1-1)creating a finction to get the route and using the locationHandler as callbackfunctin\\

app.get('/location', locationHandler)



////////(1-2)creating the locationHandler\\\\\\\\

function locationHandler(Request, Response) {
    const city = Request.query.city;
    getlocation(city)
        .then((newLocation) => {
            Response.status(200).json(newLocation)
        })
}


/////(1-3)creating a finction to return  the data as a promise function "so i have to retrive these data using the promise way which is the then after calling the calling" \\\\\\

function getlocation(city) {
    const KEY = process.env.GEOCODE_API_KEY;
    const URL = `https://us1.locationiq.com/v1/search.php?key=${KEY}&q=${city}&format=json`;
    return superagent.get(URL)
        .then((geoData) => {
            const newLocation = new AllLocation(city, geoData.body);
            return newLocation

        });

}


/////////(1-4)A constructor crating an objects of cities locations\\\\\\\\\\\

var lat ;
var lon ;
function AllLocation(city, geoData) {
    this.city = city;
    this.display_name = geoData[0].display_name;
    this.latitude = geoData[0].lat;
    this.longitude = geoData[0].lon;
    lat = this.latitude = geoData[0].lat;
    lon = this.longitude = geoData[0].lon;
}

///////////////////////////////////////////(2)create a weather route\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

let arrWeather = [];

//(2-1)creating a finction to get the route and using the weatherHandler as callbackfunctin\\

app.get('/weather', weatherHandler)



////////(2-2)creating the weatherHandler\\\\\\\\

function weatherHandler(Request, Response) {
    const city = Request.query.city;
    getWeather(city)
        .then(arrWeather => {
            Response.status(200).json(arrWeather)
        })
}

/////(2-3)creating a finction to return  the data as a promise function "so i have to retrive these data using the promise way which is the then after calling the calling" \\\\\\

function getWeather(city) {
    const KEY = process.env.WEATHER_API_KEY;
    const URL = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${KEY}`;
    return superagent.get(URL)
        .then(weatherData => {
            arrWeather = [];
            arrWeather = weatherData.body.data.map(val => {
                return new Allweather(val)
            });
            return arrWeather
        })
}

/////////(2-4)A constructor crating an objects of cities weather\\\\\\\\\\\

function Allweather(val) {
    this.forecast = val.weather.description;
    this.time = this.time = new Date(val.valid_date).toString().slice(0, 15);

}

///////////////////////////////////////////(3)create a trail route\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

let arrTeail = [];

//(3-1)creating a finction to get the route and using the trailrHandler as callbackfunctin\\

app.get('/trails', trailHandler)



////////(3-2)creating the locationHandler\\\\\\\\

function trailHandler(Request, Response) {
    const city = Request.query.city;
    getTrail(city)
        .then(arrTeail => {
            Response.status(200).json(arrTeail)
        })
}

/////(3-3)creating a finction to return  the data as a promise function "so i have to retrive these data using the promise way which is the then after calling the calling" \\\\\\
//maxDistance=10
function getTrail(city) {
    const KEY = process.env.TRAIL_API_KEY;
    const URL = `https://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${lon}&maxDistance=10&key=${KEY}`;
    return superagent.get(URL)
        .then(trailData => {
            arrTeail = [];
            arrTeail = trailData.body.trails.map(val => {
                console.log(val);
                return new Alltrails(val)
                
            });
            return arrTeail
        })

}

/////////(3-4)A constructor crating an objects of cities trails\\\\\\\\\\\

function Alltrails(val) {   
        this.name = val.name;
        this.location = val.location;
        this.length = val.length;
        this.stars = val.stars;
        this.star_votes = val.starVotes;
        this.summary = val.summary;
        this.trail_url = val.url;
        this.conditions = val.conditionDetails;
        this.condition_date = val.conditionDate.toString().slice(0 , 9);
        this.condition_time = val.conditionDate.toString().slice(11);
}



//////////////////////////////////////(5)create an error route\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

app.get('*', (Request, Response) => {


    Response.status(500).send('Page Not Found')

})



