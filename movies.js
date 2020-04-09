
const helper = require('./depen')


////////(4-2)creating the moviesHandler\\\\\\\\

function moviesHandler(request, response) {
    let city = request.query.search_query;
    getMovieData(city)
        .then((moData) => {
            response.status(200).json(moData)
        })
}

/////(4-3)creating a finction to return  the data as a promise function "so i have to retrive these data using the promise way which is the then after calling the calling" \\\\\\

function getMovieData(city) {

    const key = process.env.MOVIE_API_KEY;
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${city}`;
    console.log(url);
    return helper.superagent.get(url)
        .then(moviesData => {
            let moviesArray = moviesData.body.results.map((value) => {
                return new Movies(value);
            })
            return moviesArray;
        })
        // .catch((err) => errorHandler(err));
}


/////////(4-4)A constructor crating an objects of cities trails\\\\\\\\\\\

function Movies(value) {
    this.title = value.title;
    this.overview = value.overview;
    this.average_votes = value.vote_average;
    this.total_votes = value.vote_count;
    this.image_url = value.image_url;
    this.popularity = value.popularity;
    this.released_on = value.release_date;
}

module.exports = moviesHandler;