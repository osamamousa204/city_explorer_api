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


///////////////////////////////////////////create a location route\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

//creating a finction to get the route and using the locationHandler as callbackfunctin\\

app.get('/location', locationHandler)



////////creating the locationHandler\\\\\\\\
function locationHandler(Request, Response) {
    const city = Request.query.city;
   getlocation(city)
        .then((newLocation) => {
            Response.status(200).json(newLocation)
        })
}


/////creating a finction to return  the data as a promise function "so i have to retrive these data using the promise way which is the then after calling the calling" \\\\\\
function getlocation(city) {
    const KEY = process.env.GEOCODE_API_KEY;
    const URL = `https://us1.locationiq.com/v1/search.php?key=${KEY}&q=${city}&format=json`;
    console.log('ddddddddmmmmmd', URL);

    return superagent.get(URL)
        .then((geoData) => {
            const newLocation = new AllLocation(city, geoData.body);
            return newLocation

        });

}


/////////A constructor crating an objects of cities locations\\\\\\\\\\\

function AllLocation(city, geoData) {
    this.city = city;
    this.display_name = geoData[0].display_name;
    this.latitude = geoData[0].lat;
    this.longitude = geoData[0].lon;
}

///////////////////////////////////////////create a weather route\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
// let arrWeather = [];
// //creating a finction to get the route and using the weatherHandler as callbackfunctin\\

// app.get('/weather', weatherHandler)



// ////////creating the locationHandler\\\\\\\\

// function weatherHandler(Request, Response) {
//     const city = Request.query.search_query;
//     getWeather(city)
//         .then(arrWeather => {
//             Response.status(200).json(arrWeather)
//         })
// }

// /////creating a finction to return  the data as a promise function "so i have to retrive these data using the promise way which is the then after calling the calling" \\\\\\

// function getWeather(city) {
//     const KEY = process.env.WEATHER_API_KEY;
//     const URL = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${KEY}`;
//     console.log('dddddddddddddddd', URL);

//     return superagent.get(URL)
//         .then(weatherData => {
//             arrWeather = [];
//             arrWeather = weatherData.body.data.map(val => {
//                 return new Allweather(val)
//             });
//             return arrWeather
//         })

// }

// /////////A constructor crating an objects of cities locations\\\\\\\\\\\

// function Allweather(val) {
//     this.forecast = val.weather.description,
//         this.time = this.time = new Date(val.valid_date).toString().slice(0, 15);

// }

///////////////////////////////////////////create a trail route\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
// let arrTeail = [];
// //creating a finction to get the route and using the trailrHandler as callbackfunctin\\

// app.get('/trails', trailHandler)



// ////////creating the locationHandler\\\\\\\\

// function trailHandler(Request, Response) {
//     const city = Request.query.search_query;
//     getTrail(city)
//         .then(arrTeail => {
//             Response.status(200).json(arrTeail)
//         })
// }

// /////creating a finction to return  the data as a promise function "so i have to retrive these data using the promise way which is the then after calling the calling" \\\\\\

// function getTrail(city) {
//     const KEY = process.env.TRAIL_API_KEY;
//     const URL = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${KEY}`;
//     console.log('dddddddddddddddd', URL);

//     return superagent.get(URL)
//         .then(weatherData => {
//             arrTeail = [];
//             arrTeail = weatherData.body.data.map(val => {
//                 return new Alltrails(val)
//             });
//             return arrTeail
//         })

// }

// /////////A constructor crating an objects of cities locations\\\\\\\\\\\

// function Alltrails(val) {   
//         this.name
//         this.location
//         this.length
//         this.stars
//         this.name
//         this.name
//         this.name
//         this.name
// }



////////////////////////////////////////create an error route\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

app.get('*', (Request, Response) => {


    Response.status(500).send('Page Not Found')

})



