const express = require('express');

const router = express.Router();

//Including CourseRouter 
const courserouter = require('./course-routes');
router.use('/:bootcampId/courses', courserouter);
//If any calls comes for /api/v1/Bootcamp/:bootcampId/courses then we will route it to Courses router


const {BootcampController} = require('../../controllers');

//this is typically reffering to /api/v1/bootcamps which is a GET request
router.get('/',BootcampController.getbootcamps);

//this is typically reffering to /api/v1/bootcamps/:id which is a get request
router.get('/:id',BootcampController.getbootcampsbyId);

//this is typically reffering to /api/v1/bootcamps/radius/:zipcode/:distance
router.get('/radius/:zipcode/:distance', BootcampController.getbootcampwithinRadius);

//this is typically reffering to /api/v1/bootcamps which is a POST request
router.post('/',BootcampController.postbootcamps);

//this is typically reffering to /api/v1/bootcamps which is a PUT request
router.put('/:id',BootcampController.putbootcampsbyId);

//this is typically reffering to /api/v1/bootcamps which is a DELETE request
router.delete('/:id',BootcampController.deletebootcampbyId);

module.exports = router;
