('use strict');

const dependencies = {};

////////get the express function\\\\\\\\\

const express = require('express')

///////get the cors functions\\\\\\\\\\\

const cors = require('cors')

//////get the dotenv function\\\\\\\\\\\\

require('dotenv').config();

//////get the superagent function\\\\\\\\\\\\

dependencies.superagent = require('superagent')

//////get the pg\\\\\\\\\\\\
let pg = require('pg');
dependencies.pg = pg;


////////calling the express finction\\\\\
let app = express();
dependencies.app = app;

/////////calling cors function\\\\\\\\\\\

app.use(cors());

//////////creat a port number\\\\\\\\\\\\

dependencies.PORT = process.env.PORT || PORT

////////creating new client\\\\\

dependencies.client = new pg.Client(process.env.DATABASE_URL);

////[app / superagent / port / pg / client]

module.exports = dependencies;