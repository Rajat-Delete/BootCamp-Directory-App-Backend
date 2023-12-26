const dotenv  = require('dotenv');


//loads .env file into process.env
dotenv.config();

module.exports = {
    PORT : process.env.PORT,
    NODE_ENV : process.env.NODE_ENV,
    MONGO_DB_URI : process.env.MONGO_DB_URI,
    GEOCODER_PROVIDER : process.env.GEOCODER_PROVIDER,
    GEOCODER_API_KEY : process.env.GEOCODER_API_KEY,
    FILE_UPLOAD_PATH : process.env.FILE_UPLOAD_PATH,
    FILE_UPLOAD_SIZE : process.env.FILE_UPLOAD_SIZE,
}