const express = require('express');

const router = express.Router();

const bootcampRoutes = require('./bootcamp-routes');
const courseRoutes = require('./course-routes');

router.use('/bootcamps', bootcampRoutes);
router.use('/courses', courseRoutes);

module.exports = router;