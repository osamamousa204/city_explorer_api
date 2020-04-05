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

/////////////////////sending a respond for test\\\\\\\\\\\\\\\\\\\\\\

// app.get('/',(Request,Response)=>{

//     Response.status(200).send('hello')
// })

//////////////////////////

app.get('/location',(Request,Response)=>{

    const geoData = require('./data/geo.json');
    const city = Request.query.city;
    const newLocation = new AllLocation(city,geoData)
    Response.send(newLocation)

})

///////////////A constructor crating an objects of cities\\\\\\\\\\\\\\\

function AllLocation (city,geoData){
    
    this.search_query = city;
    this.search_query = 'Washington',
    this.display_name = geoData[0].display_name,
    this.latitude = geoData[0].lat,
    this.longitude = geoData[0].lon
}