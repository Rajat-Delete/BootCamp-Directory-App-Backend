const {Courseservice} = require('../service');
const {StatusCodes} = require('http-status-codes');
const {SuccessResponse , ErrorResponse} = require('../utils/common');
const AppError = require('../utils/error/app-error');


async function getCourses(request,response){
    try {
        const courses = await Courseservice.getCourses(request);
        console.log('courses',courses);
        if(courses.length === 0){
            throw new AppError('There are no courses existing',StatusCodes.NOT_FOUND);
        }
        SuccessResponse.data = courses;
        return response.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return response.status(error.statusCode).json(ErrorResponse);
    }
}

async function getCourse(request,response){
    try {
        const course = await Courseservice.getCourse(request.params.id);
        SuccessResponse.data = course;
        return response.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return response.status(error.statusCode).json(ErrorResponse);
    }
}

async function postCourse(request,response){
    try{
        request.body.bootcamp = request.params.bootcampId;
        const course = await Courseservice.postCourse(request.body);
        SuccessResponse.data = course;
        return response.status(StatusCodes.OK).json(SuccessResponse);
    }catch(error){
        ErrorResponse.error = error;
        return response.status(error.statusCode).json(ErrorResponse);
    }
}


async function updateCourse(request,response){
    try {
        //so from the frontend user will be sending data , we have to validate and persist in Database

        //If new = true, then it returns the modified document instead of the old document
        const course = await Courseservice.updateCourse(request.params.id, request.body , {
            new : true,
            runValidators : true,
        });
        SuccessResponse.data = course;
        return response.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        console.log('errror : ',error);
        ErrorResponse.error = error;
        return response.status(error.statusCode).json(ErrorResponse);
    }
}

async function deleteCourse(request,response){
    try {
        const course = await Courseservice.deleteCourse(request.params.id);
        SuccessResponse.data= course;
        return response.status(StatusCodes.OK).json(SuccessResponse);
    } catch(error) {
        ErrorResponse.error = error;
        return response.status(error.statusCode).json(ErrorResponse);
    }
}

module.exports = {
    getCourses,
    getCourse,
    postCourse,
    updateCourse,
    deleteCourse,
}

