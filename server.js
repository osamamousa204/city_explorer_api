'use strict';

const helper = require('./depen')

//**************************************************************************************************\\

//================lestining to the port===============\\

helper.client.connect()
    .then(() => {

        helper.app.listen(helper.PORT, () => {

            console.log(`Listening to port ${helper.PORT}`);

        });
    })


//**************************************************************************************************\\

//================(1)create a location route============\\
const checkLocations = require('./location.js')
helper.app.get('/location', checkLocations)




//**************************************************************************************************\\

//================(2)create a weather route==============\\
const weatherHandler = require('./weather.js')
helper.app.get('/weather', weatherHandler)


//**************************************************************************************************\\


//================(3)create a trail route================\\
const trailHandler = require('./trails.js')

helper.app.get('/trails', trailHandler)


//**************************************************************************************************\\


//================(4)create a movies route===============\\

const moviesHandler = require('./movies.js')

helper.app.get('/movies', moviesHandler);


//**************************************************************************************************\\


//==================(5)create a yelp route=================\\

const yelpHandler = require('./yelp.js')

helper.app.get('/yelp',yelpHandler);


//**************************************************************************************************\\


//==================(6)the errorHandler=====================\\

// function errorHandler(error) {
//     response.status(500).send(error)
// }


//**************************************************************************************************\\


//==================(7)create an error route================\\


helper.app.get('*', (Request, Response) => {


    Response.status(404).send('Page Not Found')

})



