require("dotenv").config();

exports.config = {
MONGO_DB:process.env.MONGO_DB,
TOKEN_SECRET:process.env.TOKEN_SECRET,

API_KEY_COINS:process.env.API_KEY_COINS,
API_HOST_COINS:process.env.API_HOST_COINS,

API_KEY_TRIPADVISOR:process.env.API_KEY_TRIPADVISOR,
API_HOST_TRIPADVISOR:process.env.API_HOST_TRIPADVISOR,

CLOUD_NAME:process.env.CLOUD_NAME,
CLOUD_KEY:process.env.CLOUD_KEY,
CLOUD_SECRET:process.env.CLOUD_SECRET
}