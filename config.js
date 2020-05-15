const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  PORT,
  UNSPLASH_DEFAULT_APP_ID,
  UNSPLASH_PHOTO_CATEGORIES,
  REDIS_URL,
  REDIS_TIME_EXP,
  UNSPLASH_APP_SBNT_ID
} = process.env;
