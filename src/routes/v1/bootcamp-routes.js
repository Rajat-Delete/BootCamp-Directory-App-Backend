const express = require('express');

const router = express.Router();

//this is typically reffering to /api/v1/bootcamps which is a GET request
router.get('/',(request,response)=>{
    response.status(200).json({
        Message : 'Show all Bootcamps'
    });
});

//this is typically reffering to /api/v1/bootcamps which is a POST request
router.post('/',(request,response)=>{
    response.status(200).json({
        Message : `post request to Bootcamp`
    });
});

//this is typically reffering to /api/v1/bootcamps which is a PUT request
router.put('/:id',(request,response)=>{
    response.status(200).json({
        Message : `put request to Bootcamp: ${request.params.id}`
    });
});

//this is typically reffering to /api/v1/bootcamps which is a DELETE request
router.delete('/:id',(request,response)=>{
    response.status(200).json({
        Message : `delete request to Bootcamp: ${request.params.id}`
    });
});

module.exports = router;
