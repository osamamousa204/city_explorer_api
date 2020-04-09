

const helper = require('./depen')

//=====(1-2)creating the checkLocation=========\\

function checkLocation(request, response) {
    const city = request.query.city;
    let sql = `SELECT * FROM locations WHERE search_query = '${city}';`;
    helper.client.query(sql)
        .then(result => {
            if (result.rows.length > 0) {
                response.status(200).json(result.rows[0]);
            } else {
                getlocation(city)
                    .then(newLocation => {
                        let cty = newLocation.search_query;
                        let foQuery = newLocation.formatted_query;
                        let lat = newLocation.latitude;
                        let lng = newLocation.longitude;
                        let safeValues = [cty, foQuery, lat, lng];
                        let SQL = 'INSERT INTO locations (search_query,formatted_query,latitude,longitude) VALUES ($1,$2,$3,$4);';
                        return helper.client.query(SQL, safeValues)
                            .then(result2 => {
                                response.status(200).json(result2.rows[0]);
                            })
                            // .catch(error => errorHandler(error));
                    })
            }
        })
}

//====(1-3)creating a finction to return  the data as a promise function "so i have to retrive these data using the promise way which is the then after calling the calling" =====\\

function getlocation(city) {
    const KEY = process.env.GEOCODE_API_KEY;
    const URL = `https://us1.locationiq.com/v1/search.php?key=${KEY}&q=${city}&format=json`;
    return helper.superagent.get(URL)
        .then((geoData) => {
            const newLocation = new AllLocation(city, geoData.body);
            return newLocation

        });

}


//====(1-4)A constructor crating an objects of cities locations======\\

function AllLocation(city, geoData) {
    this.search_query = city;
    this.formatted_query = geoData[0].display_name;
    this.latitude = geoData[0].lat;
    this.longitude = geoData[0].lon;

}

module.exports = checkLocation;