const express = require('express');

const { ServerConfig } = require('./src/config');

const PORT = ServerConfig.PORT || 5000;

const app = express();

app.listen(PORT , ()=>{
    console.log(`Server is running in ${ServerConfig.NODE_ENV} Environment at PORT ${PORT}`);
});