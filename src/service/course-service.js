const { StatusCodes } = require('http-status-codes');
const Course = require('../models/course');
const AppError = require('../utils/error/app-error');

async function getCourses(request){
    let query;
    try{
        //the initial If statement is finding the course related to a specific bootcamp
        if(request.params.bootcampId){
            query = Course.find({bootcamp : request.params.bootcampId})
        }else{
            query = Course.find().populate({
                path : 'bootcamp',
                select : 'name description'
            });
        }
        const courses = await query;
        return courses;
    }catch(error){
        console.log(error);
        throw new AppError('Something went Wrong while fetching details of all courses',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


//Now 

module.exports = {
    getCourses,
}