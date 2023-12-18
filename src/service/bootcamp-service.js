const { StatusCodes } = require('http-status-codes');
const Bootcamp = require('../models/bootcamp');
const AppError = require('../utils/error/app-error');
const {Geocoder} = require('../utils/common');


async function getbootcamps(query){
    try{
        console.log('query in getbootcamps service',query);
        let newQuery;
        //copy req query
        const reqQuery = { ...query };

        //Fields to exclude
        const removeFields = ['select','sort','page','limit'];

        //iterates over reqQuery and removes the fields
        removeFields.forEach(param => delete reqQuery[param]);

        console.log(reqQuery);

        //regex to replace all arithmetic operator with $ infront of them
        let queryStr = JSON.stringify(reqQuery);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/, match => `$${match}`);
        console.log('querystr',JSON.parse(queryStr));

        newQuery = Bootcamp.find(JSON.parse(queryStr));

        //select fields from bootcamps
        if(query.select){
            const fields = query.select.split(',').join(' ');
            newQuery = newQuery.select(fields);
        }

        //sort
        if(query.sort){
            const sortBy = query.sort.split(',').join(' ');
            newQuery.sort(sortBy);
        }else{
            newQuery.sort('-createdAt');
        }

        //pagination
        const limit = parseInt(query.limit , 10) || 1;
        const page = parseInt(query.page , 10) || 1;
        const startIndex = (page - 1)*limit;
        const endIndex = page * limit;
        const total = await Bootcamp.countDocuments();

        newQuery.skip(startIndex).limit(limit);

        //pagination results
        const pagination = {};

        if(endIndex < total){
            pagination.next = {
                page : page +1,
                limit: limit
            }
        }

        if(startIndex > 0){
            pagination.prev = {
                page : page -1,
                limit : limit
            }
        }

        const bootcamps = await newQuery;
        bootcamps.pagination = pagination;
        return bootcamps;

    }catch(error){
        console.log(error);
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


async function getbootcampwithinRadius(data){
    try {
        //Getting langitude / Longitude from geocoder
        const loc = await Geocoder.geocode(data.zipcode);
        const latitude = loc[0].latitude;
        const longitude = loc[0].longitude;


        //calculate radius 
        //divide distance by radius of earth
        //Earth Radius = 3963mi/6378km
        const radius = data.distance/3963;

        const bootcamps = await Bootcamp.find({
            location :{ $geoWithin : { $centerSphere : [[ longitude , latitude ], radius]}}
        });

        return bootcamps;
    } catch (error) {
        console.log('error in getbootcamp within radius' , error);
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