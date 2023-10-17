const router = require('express').Router();
const courseRoutes = require('./userRoutes');
const studentRoutes = require('./thoughtRoutes');

router.use('/courses', courseRoutes);
router.use('/students', studentRoutes);

module.exports = router;
