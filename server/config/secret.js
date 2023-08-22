require("dotenv").config();

exports.config = {
MONGO_DB:process.env.MONGO_DB,
TOKEN_SECRET:process.env.TOKEN_SECRET,
CLOUD_NAME:process.env.CLOUD_NAME,
CLOUD_KEY:process.env.CLOUD_KEY,
CLOUD_SECRET:process.env.CLOUD_SECRET
}