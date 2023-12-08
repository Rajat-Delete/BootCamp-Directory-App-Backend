const dotenv  = require('dotenv');


//loads .env file into process.env
dotenv.config();

module.exports = {
    PORT : process.env.PORT,
    NODE_ENV : process.env.NODE_ENV,
}