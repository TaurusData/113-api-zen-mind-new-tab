const {
  UNSPLASH_APP_ID,
  REDIS_TIME_EXP,
  UNSPLASH_PHOTO_CATEGORIES
} = require("../config");

const axios = require("axios");

module.exports = (app, redis_client) => {
  //Middleware Function to Check Cache
  const checkCache = (req, res, next) => {
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

  app.get("/get-unsplash-images", checkCache, async (req, res) => {
    try {
      const { page } = req.query;

      const images = await axios.get(
        `https://api.unsplash.com/search/photos/?page=${page}&per_page=30&query=${UNSPLASH_PHOTO_CATEGORIES}&client_id=${UNSPLASH_APP_ID}&orientation=landscape`
      );

      //get data from response
      const imagesData = images.data;

      //add data to Redis
      redis_client.setex(page, REDIS_TIME_EXP, JSON.stringify(imagesData));

      return res.json(imagesData);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  });
};
