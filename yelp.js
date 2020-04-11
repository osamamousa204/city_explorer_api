const helper = require('./depen')



//================((2-2)creating the yelpHandler===============\\



function yelpHandler(request,response){
  let city = request.query.search_query;

  getyelpData(city)
    .then((yelpData)=>{
      response.status(200).json(yelpData)
    })
}

//=====(2-3)creating a finction to return  the data as a promise function "so i have to retrive these data using the promise way which is the then after calling the calling"=====\\

function getyelpData(city){
  const key = process.env.YELP_API_KEY;
  let url =`https://api.yelp.com/v3/businesses/search?location=${city}`;
  console.log(url);
  
  return helper.superagent(url)
  .set({'Authorization':`Bearer ${key}`})
    .then(yelData =>{
      let yelpArray = yelData.body.businesses.map((value) => {
        return new Yelp(value);
      })
      console.log(yelpArray);
      
      return yelpArray;
    })
    // .catch((err) => errorHandler(err));
}

//=======(2-4)A constructor crating an objects of yelp data============\\

function Yelp(value){
    this.name = value.name;
    this.image_url = value.image_url;
    this.price = value.price;
    this.rating= value.rating;
    this.url = value.url;
}

module.exports = yelpHandler;

// function yelpHandler(request,response){
//     let city = request.query.search_query;
//     //   const lat = request.query.latitude;
//     //   const lon = request.query.longitude;
//     const key = process.env.YELP_API_KEY;
//     console.log('Im in');
//     let url =`https://api.yelp.com/v3/businesses/search?location=${city}`;
//     help.superagent(url)
//       .set({'Authorization':`Bearer ${key}`})
//       .then(yelData =>{
//         console.log(url);
//         let yelpArray = yelData.body.businesses[0].map((value) => {
//           return new Yelp(value);
//         })
//         console.log(yelpArray);
//         response.status(200).json(yelpArray);
//       })
//       .catch((err) => errorHandler(err, request, response));
//   }
//   console.log(yelpHandler);
//   function Yelp(value){
    // this.name = value.name;
    // this.image_url = value.image_url;
    // this.price = value.price;
    // this.rating= value.rating;
    // this.url = value.url;
//   }
//   // ////////////////////////////////////////////////
//   function errorHandler(error, request, response) {
//     response.status(500).send(error);
//   }
//   module.exports = yelpHandler;