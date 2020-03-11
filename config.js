const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  PORT,
  UNSPLASH_APP_ID,
  UNSPLASH_PHOTO_CATEGORIES,
  PORT_REDIS,
  REDIS_TIME_EXP
} = process.env;
