const express = require('express');
const {CourseController} = require('../../controllers')
const router = express.Router({mergeParams : true});

//this is typically reffering to /api/v1/courses/ which is a GET request
router.get('/',CourseController.getCourses);


//this will be typically reffering to /api/v1/bootcamps/:bootcampId/courses/
router.get('')

module.exports = router;