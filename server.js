const express = require("express");
const redis = require("redis");
const axios = require("axios");
const bodyParser = require("body-parser");

//setup port constants
const port_redis = process.env.PORT || 6379;
const port = process.env.PORT || 3000;

//configure redis client on port 6379
const redis_client = redis.createClient(port_redis);

//configure express server
const app = express();

//Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('assets'));


//Middleware Function to Check Cache
checkCache = (req, res, next) => {
  const { page } = req.query;

  redis_client.get(page, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    //if no match found
    if (data != null) {
      res.send(JSON.parse(data));
    } else {
      //proceed to next middleware function
      next();
    }
  });
};
const photoCategories = ['landscape', 'nature', 'relax'];
const APP_ID =
	'c56d26558c227caf463eae9ee8c64bf3ae7bf7eb4e56e3929154620d1c2e6aa5';
const query = photoCategories.join(',');


//  Endpoint:  GET /starships/:id
//  @desc Return Starships data for particular starship id
app.get("/get-unsplash-images", checkCache, async (req, res) => {
  try {
    const { page } = req.query;


    const images = await axios.get(
      `https://api.unsplash.com/search/photos/?page=${page}&per_page=20&query=${query}&client_id=${APP_ID}&orientation=landscape`
    );

    //get data from response
    const imagesData = images.data;

    //add data to Redis
    redis_client.setex(page, 100000, JSON.stringify(imagesData));

    return res.json(imagesData);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});


//listen on port 5000;
app.listen(port, () => console.log(`Server running on Port ${port}`));