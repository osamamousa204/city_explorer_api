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

/////////////////////sending a respond\\\\\\\\\\\\\\\\\\\\\\

app.get('/',(Request,Response)=>{

    Response.status(200).send('hello')
})

