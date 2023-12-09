const express = require('express');

const router = express.Router();

const bootcampRoutes = require('./bootcamp-routes');

router.use('/bootcamps', bootcampRoutes);

module.exports = router;