const mongoose = require('mongoose');

const Courseschema = new mongoose.Schema({
    title : {
        type : String,
        trim : true,
        required : [true,'Please add a course title']

    },
    description : {
        type : String,
        required : [true ,'Please add a description']
    },
    weeks : {
        type : String,
        required : [true , 'Please enter weeks for the Course']
    },
    tuition : {
        type : Number,
        required : [true , 'Please enter tution fee for the Course']
    },
    minimumSkill : {
        type : String,
        required : [true , 'Please add a minimum Skill'],
        enum : ['beginner','intermediate','advanced']
    },
    scholarshipavailable : {
        type: Boolean,
        default : false,
    },
    createdAt : {
        type : Date,
        default : Date.now(),
    },
    bootcamp  :{
        type : mongoose.Schema.ObjectId, //this is going to refer to the object id of Bootcamp
        ref : 'Bootcamp', //this is going to tell about the model we are reffering to 
        required : true,
    }


});

module.exports = mongoose.model ('Course',Courseschema)