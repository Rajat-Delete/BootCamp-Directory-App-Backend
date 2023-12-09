const mongoose = require('mongoose');

//Since mongoose.connect returns us a promise so instead of then chaining we will bind it in async await

const connectDB = async ()=>{
   const conn =  await mongoose.connect(process.env.MONGO_DB_URI);
   console.log(`Mongo DB Connected : ${conn.connection.host}`);
}

module.exports = connectDB;
