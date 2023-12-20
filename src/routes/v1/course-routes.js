const express = require('express');
const {CourseController} = require('../../controllers')
const router = express.Router({mergeParams : true});

//this is typically reffering to /api/v1/courses/ which is a GET request
router.get('/',CourseController.getCourses);


//this will be typically reffering to /api/v1/courses/:id which is a GET request
router.get('/:id',CourseController.getCourse);


//this will be typically reffering to /api/v1/bootcamp/:bootcampId/courses/ which will be POST request
router.post('/',CourseController.postCourse);

//this will be typically reffering to /api/v1/courses/:id which will be a put request
router.put('/:id',CourseController.updateCourse);

//this will be typically reffering to /api/v1/courses/:id which will be a delete request
router.delete('/:id',CourseController.deleteCourse);

module.exports = router;