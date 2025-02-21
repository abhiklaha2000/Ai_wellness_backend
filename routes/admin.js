const express =  require('express');
const admin_router = new express.Router();
const bodyParser = require('body-parser');

admin_router.use(bodyParser.json())
admin_router.use(bodyParser.urlencoded({extended:true}));

const adminController = require('../controllers/admin');
admin_router.get('/nominees/:category_type/admin',adminController.getNomineeByType);

module.exports = admin_router;

