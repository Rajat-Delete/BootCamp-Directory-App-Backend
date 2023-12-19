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

module.exports = {
    getCourses,
}

