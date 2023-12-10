const { StatusCodes } = require('http-status-codes');
const Bootcamp = require('../models/bootcamp');

async function getbootcamps(request,response){
    try{
        const bootcamps = await Bootcamp.find();
        return response.status(StatusCodes.OK).json({
            Success : true,
            Count : bootcamps.length,
            Data : bootcamps,
        });
    }catch(error){
        return response.status(StatusCodes.BAD_REQUEST).json({
            Success : false,
            Error : error,
        })
    }
}

async function getbootcampsbyId(request,response){
    try{
        const bootcamp = await Bootcamp.findById(request.params.id);
        if(!bootcamp){
            return response.status(StatusCodes.BAD_REQUEST).json({
                Success : false,
                Data : 'No bootcamp for the Given Id',
            })
        }

        return response.status(StatusCodes.OK).json({
            Success : true,
            Data : bootcamp,
        })
    }catch(error){
        return response.status(StatusCodes.OK).json({
            Success : false,
            Error : error,
        });
    }
}

async function postbootcamps(request,response){
    //although we have to write the creating logic into service layer but for now writing here
    try{
        const bootcamp = await Bootcamp.create(request.body);
        return response.status(StatusCodes.CREATED).json({
            Success : true,
            Data : bootcamp,
       });
    }catch(error){
        return response.status(StatusCodes.BAD_REQUEST).json({
            Success : false,
            Error : error,
        })
    }
}

async function putbootcampsbyId(request,response){
    try{
        //here new : true return the updated document instead of the original document
        //run validator : true validates the field getting updated
        const bootcamp = await Bootcamp.findByIdAndUpdate(request.params.id , request.body , {
            new : true,
            runValidators : true,
        })

        if(!bootcamp){
            return response.status(StatusCodes.BAD_REQUEST).json({
                Success : false,
                Data : 'No bootcamp for the Given Id',
            })
        }

        return response.status(StatusCodes.OK).json({
            Success : true,
            Data : bootcamp,
        })
    }catch(error){
        return response.status(StatusCodes.BAD_REQUEST).json({
            Success : false,
            Error : error,
        })
    }
}

async function deletebootcampbyId(request,response){
    try{
        const bootcamp = await Bootcamp.findByIdAndDelete(request.params.id);

        if(!bootcamp){
            return response.status(StatusCodes.BAD_REQUEST).json({
                Success : false,
                Message : 'No BootCamp for the Given Id',
            })
        }
        return response.status(StatusCodes.OK).json({
            Success : true,
            Data : {}
        });

    }catch(error){
        return response.status(StatusCodes.BAD_REQUEST).json({
            Success : false,
            Error : error,
        })
    }
}

module.exports = {
    getbootcamps,
    postbootcamps,
    putbootcampsbyId,
    deletebootcampbyId,
    getbootcampsbyId,
}