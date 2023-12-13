const { StatusCodes } = require('http-status-codes');
const Bootcamp = require('../models/bootcamp');
const AppError = require('../utils/error/app-error');


async function getbootcamps(request,response){
    try{
        const bootcamps = await Bootcamp.find();
        return bootcamps;
    }catch(error){
        throw new AppError('Something went wrong while fetching All bootcamps',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getbootcampsbyId(data){
    try{
        const bootcamp = await Bootcamp.findById(data);
        return bootcamp;
    }catch(error){
        throw new AppError(`Bootcamp not found with Id ${data}`,StatusCodes.NOT_FOUND);
    }
}

async function postbootcamps(data){
    try{
        const bootcamp = await Bootcamp.create(data);
        return bootcamp;
    }catch(error){
        //added condition for duplicate key check
        if(error.name === 'MongoServerError'){
            throw new AppError(`Duplicate Key error in Field:  ${(Object.keys(error.keyValue))}`,StatusCodes.BAD_REQUEST)
        }
        throw new AppError(error.message,StatusCodes.BAD_REQUEST);
    }
}

async function putbootcampsbyId(id ,body, options){
    try{
        const bootcamp = await Bootcamp.findByIdAndUpdate(id , body , options);
        return bootcamp;
    }catch(error){
        throw new AppError(error.message ,StatusCodes.BAD_REQUEST);
    }
}

async function deletebootcampbyId(data){
    try{
        const bootcamp = await Bootcamp.findByIdAndDelete(data);
        return bootcamp;
    }catch(error){
        throw new AppError(error.message,StatusCodes.BAD_REQUEST);
    }
}

module.exports = {
    getbootcamps,
    postbootcamps,
    putbootcampsbyId,
    deletebootcampbyId,
    getbootcampsbyId,
}