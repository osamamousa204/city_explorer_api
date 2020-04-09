// let arrTeail = [];
const helper = require('./depen')

////////(3-2)creating the trailHandler\\\\\\\\

function trailHandler(Request, Response) {
    const lat = Request.query.latitude;
    const lon = Request.query.longitude;
    getTrail(lat, lon)
        .then(arrTeail => {
            Response.status(200).json(arrTeail)
        })
}

/////(3-3)creating a finction to return  the data as a promise function "so i have to retrive these data using the promise way which is the then after calling the calling" \\\\\\

function getTrail(lat, lon) {
    const KEY = process.env.TRAIL_API_KEY;
    const URL = `https://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${lon}&maxDistance=500&key=${KEY}`;
    return helper.superagent.get(URL)
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
    this.condition_date = val.conditionDate.toString().slice(0, 9);
    this.condition_time = val.conditionDate.toString().slice(11);
}

module.exports = trailHandler;