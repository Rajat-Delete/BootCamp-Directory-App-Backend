const express = require('express');
const morgan = require('morgan');
const connectDB = require('./src/config/dbconfig');
const { ServerConfig } = require('./src/config');

const PORT = ServerConfig.PORT || 5000;

//connect the DB
connectDB();

const approutes =  require('./src/routes');

const app = express();
//added morgan to log the Incoming request
app.use(morgan('dev'));
app.use('/api',approutes);


const server = app.listen(PORT , ()=>{
    console.log(`Server is running in ${ServerConfig.NODE_ENV} Environment at PORT ${PORT}`);
});

//to handle promise rejections
process.on('unhandledRejection',(err,promise)=>{
    console.log(`Error : ${err.message}`);
    server.close(()=> process.exit(1));
})