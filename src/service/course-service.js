const { StatusCodes } = require('http-status-codes');
const Course = require('../models/course');
const BootCamp = require('../models/bootcamp');
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
        throw new AppError('Something went Wrong while fetching details of all courses',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getCourse(data){
    try {
        const course  = await Course.findById(data);
        if(!course){
            throw new AppError(`No Course exists with the CourseId ${data}`,StatusCodes.NOT_FOUND);
        }
        return course;
    } catch (error) {
        throw new AppError(`Something went wrong while fetching details of CourseId : ${data}`,StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function postCourse(data){
    try {
        console.log('data in postCourse',data);
        //checking if the bootcamp exists in the database or not for which the course is going to be created
        console.log(!BootCamp.findById(data.bootcamp));
        if(! await BootCamp.findById(data.bootcamp)){
            throw new AppError(`Unable to find Bootcamp with Id : ${data.bootcamp}`,StatusCodes.NOT_FOUND);
        }
        const course = await Course.create(data);
        return course;
    } catch (error) {
        console.log('error',error.message);
        throw new AppError(error.message,StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


async function updateCourse(id , data, options){
    try {
        let course = await Course.findById(id);
        if(!course){
            throw new AppError(`Unable to find Course with Id ${id}`,StatusCodes.NOT_FOUND);
        }

        //Now if the course exists then update the content
        course = await Course.findByIdAndUpdate(id, data, options);
        return course;
    } catch (error) {
        console.log('error',error);
        throw new AppError(error.message , StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function deleteCourse(data){
    try {
        let course = await Course.findById(data);
        if(!course){
            throw new AppError(`Unable to find Course with Id ${data}`,StatusCodes.NOT_FOUND);
        }
        //Now we have to delete the course as well
        course = await course.deleteOne({_id : data});
        return course;
    } catch (error) {
        throw new AppError(error.message,StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


//Now 

module.exports = {
    getCourses,
    getCourse,
    postCourse,
    deleteCourse,
    updateCourse,
}