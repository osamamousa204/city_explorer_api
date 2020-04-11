let arrWeather = [];

const helper = require('./depen')


//================((2-2)creating the weatherHandler===============\\

function weatherHandler(Request, Response) {
    const city = Request.query.search_query;
    getWeather(city)
        .then(arrWeather => {
            Response.status(200).json(arrWeather)
        })
}

//=====(2-3)creating a finction to return  the data as a promise function "so i have to retrive these data using the promise way which is the then after calling the calling"=====\\

function getWeather(city) {
    const KEY = process.env.WEATHER_API_KEY;
    const URL = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${KEY}`;
    return helper.superagent.get(URL)
        .then(weatherData => {
            arrWeather = [];
            arrWeather = weatherData.body.data.map(val => {
                return new Allweather(val)
            });
            return arrWeather
        })
}

//=======(2-4)A constructor crating an objects of cities weather============\\

function Allweather(val) {
    this.forecast = val.weather.description;
    this.time = this.time = new Date(val.valid_date).toString().slice(0, 15);

}

module.exports = weatherHandler;