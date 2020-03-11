const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  PORT,
  UNSPLASH_APP_ID,
  UNSPLASH_PHOTO_CATEGORIES,
  REDIS_URL,
  REDIS_TIME_EXP
} = process.env;
