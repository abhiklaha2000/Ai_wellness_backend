const express =  require('express');
const nominee_router = new express.Router();

const bodyParser = require('body-parser');
nominee_router.use(bodyParser.json())
nominee_router.use(bodyParser.urlencoded({extended:true}));

// Register Controller
const nomineeController = require('../controllers/nominee');
nominee_router.get('/nominees/:category_type', nomineeController.getNominees);
nominee_router.post('/nominees',nomineeController.createNominees);

module.exports = nominee_router;

