const fs = require('fs');
const dotenv  = require('dotenv');
const mongoose = require('mongoose');
const path =require('path');

//taking all the config from dotenv
dotenv.config({ path: '../../.env'});
console.log('process after',process.env);


//loading the Models
const Bootcamp = require('../models/bootcamp');

//connect to DB
const conn = mongoose.connect('mongodb+srv://rajat:PandeyJi12345%40%23%24@bootcamp-api.h2zzcww.mongodb.net/');
console.log('Mongo DB Connected in Seeders File');

//Reading JSON Files
const data = JSON.parse(fs.readFileSync(path.join(__dirname,'..','_data','bootcamps.json')));
console.log('data is ',data);

//Importing into DB
const importData = async ()=>{
    try{
        await Bootcamp.create(data);
        console.log('data imported successfully');
        process.exit();
    }catch(error){
        console.log('error while insterting data in DB',error);
    }
}

const destroyData = async ()=>{
    try{
        await Bootcamp.deleteMany();
        console.log('data desctroyed successfully');
        process.exit();
    }catch(error){
        console.log('error while destroying data in DB',error);
    }
}

//putting check on based on args passed while running seeders
if(process.argv[2] === '-i'){
    importData();
}else if(process.argv[2] === '-d'){
    destroyData();
}
