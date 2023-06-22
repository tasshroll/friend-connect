const router = require('express').Router();
const userRoutes = require('./userRoutes');
// const studentRoutes = require('./thoughtRoutes');

// router.use('/courses', courseRoutes);
router.use('/users', userRoutes);

module.exports = router;
