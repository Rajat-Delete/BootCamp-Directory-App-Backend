const { StatusCodes } = require('http-status-codes');


function getbootcamps(request,response){
    return response.status(StatusCodes.OK).json({
        Message : 'Show all Bootcamps'
    })
}

function getbootcampsbyId(request,response){
    return response.status(StatusCodes.OK).json({
        Message : `Get Request to Bootcamp Id : ${request.params.id}`
    })
}

function postbootcamps(request,response){
    return response.status(StatusCodes.OK).json({
        Message : `post request to Bootcamp`
    })
}

function putbootcampsbyId(request,response){
    return response.status(StatusCodes.OK).json({
        Message : `put request to Bootcamp: ${request.params.id}`
    })
}

function deletebootcampbyId(request,response){
    return response.status(StatusCodes.OK).json({
        Message : `delete request to Bootcamp: ${request.params.id}`
    })
}

module.exports = {
    getbootcamps,
    postbootcamps,
    putbootcampsbyId,
    deletebootcampbyId,
    getbootcampsbyId,
}