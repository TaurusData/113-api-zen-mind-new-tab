const express = require("express");
const redis = require("redis");
const bodyParser = require("body-parser");

const { PORT, REDIS_URL } = require("./config");

//setup port constants
const redis_url = REDIS_URL || 'redis://127.0.0.1:6379';
const port = PORT || 4444;

//configure redis client on port 6379
const redis_client = redis.createClient(redis_url);

//configure express server
const app = express();

//Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('assets'));

require("./routes")(app, redis_client);

//listen on port 4444;
app.listen(port, () => console.log(`Server running on Port ${port}`));