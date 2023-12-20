const {Bootcampservice} = require('../service');
const {StatusCodes} = require('http-status-codes');
const { SuccessResponse,ErrorResponse } = require('../utils/common');
const AppError = require('../utils/error/app-error');

async function getbootcamps(request,response){
    try{
        //console.log('request',request.query);
        const bootcamps = await Bootcampservice.getbootcamps(request.query);
        if(bootcamps.length > 0){
            SuccessResponse.count = bootcamps.length;
        }
        SuccessResponse.data = bootcamps;
        SuccessResponse.pagination = bootcamps.pagination;
        return response.status(StatusCodes.OK).json(SuccessResponse);
    }catch(error){
        ErrorResponse.error = error;
        return response.status(error.statusCode).json(ErrorResponse)
    }
}

async function getbootcampsbyId(request,response){
    try{
        const bootcamp = await Bootcampservice.getbootcampsbyId(request.params.id);
        if(!bootcamp){
            throw new AppError(`Bootcamp not found with Id ${request.params.id}`,StatusCodes.NOT_FOUND)
        }
        SuccessResponse.data = bootcamp;
        return response.status(StatusCodes.OK).json(SuccessResponse);
    }catch(error){
        ErrorResponse.error = error;
        return response.status(error.statusCode).json(ErrorResponse);
    }
}

async function postbootcamps(request,response){
    //although we have to write the creating logic into service layer but for now writing here
    try{
        const bootcamp = await Bootcampservice.postbootcamps(request.body);
        console.log('bootcamp posted',bootcamp);
        if(!bootcamp){
            console.log(bootcamp);
            throw new AppError('Unable to create bootcamp',StatusCodes.BAD_REQUEST)
        }
        SuccessResponse.data= bootcamp;
        return response.status(StatusCodes.OK).json(SuccessResponse);
    }catch(error){
        ErrorResponse.error = error;
        return response.status(error.statusCode).json(ErrorResponse);
    }
}

async function putbootcampsbyId(request,response){
    try{
        //here new : true return the updated document instead of the original document
        //run validator : true validates the field getting updated
        const bootcamp = await Bootcampservice.putbootcampsbyId(request.params.id, request.body, {
            new : true,
            runValidators : true,
        });
        console.log('bootcamp data: ',bootcamp);
        if(!bootcamp){
            throw new AppError(`Unable to find Bootcamp with Id ${request.params.id}`,StatusCodes.BAD_REQUEST);
        }
        SuccessResponse.data = bootcamp;
        return response.status(StatusCodes.OK).json(SuccessResponse);
    }catch(error){
        ErrorResponse.error = error;
        return response.status(error.statusCode).json(ErrorResponse);
    }
}

async function deletebootcampbyId(request,response){
    try{
        const bootcamp = await Bootcampservice.deletebootcampbyId(request.params.id);
        if(!bootcamp){
            throw new AppError(`Unable to find BootCamp with Id ${request.params.id}`,StatusCodes.BAD_REQUEST);
        }
        SuccessResponse.data = bootcamp;
        return response.status(StatusCodes.OK).json(SuccessResponse);

    }catch(error){
       ErrorResponse.error = error;
       return response.status(error.statusCode).json(ErrorResponse);
    }
}

//so the type of request coming to this api will be /api/v1/botocamps/radius/:zipcode/:distance
async function getbootcampwithinRadius(request,response){
    try{
        const {zipcode , distance} = request.params;
        const bootcamps = await Bootcampservice.getbootcampwithinRadius({zipcode , distance});
        SuccessResponse.data = bootcamps;
        return response.status(StatusCodes.OK).json(SuccessResponse);
    }catch(error){
        console.log('Error in getbootcampswithin radius',error);
        ErrorResponse.error = error;
       return response.status(error.statusCode).json(ErrorResponse);
    }
}

module.exports = {
    getbootcamps,
    postbootcamps,
    putbootcampsbyId,
    deletebootcampbyId,
    getbootcampsbyId,
    getbootcampwithinRadius,
}