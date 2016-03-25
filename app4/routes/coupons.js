var express = require('express');
var router = express.Router();
var models = require('../models');
var expressValidator = require('express-validator');


// fetch record
router.get('/', function(req, res, next) {
	getCoupon(function(category){
		res.send(category);
	})	
});

module.exports = router;

// get category
function getCoupon(callback){
	models.coupons.findAll({			
	}).then(function (result) {    	
    	callback(result);
	});
}