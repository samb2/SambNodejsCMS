const express = require('express');
const router = express.Router();

const adminController = require('app/http/controllers/admin/AdminController');

router.use((req,res,next)=>{

    res.locals.layout = 'admin/master';
    next();
});

router.get('/', adminController.index);
router.get('/courses', adminController.courses);

module.exports = router;