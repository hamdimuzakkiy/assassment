var express = require('express');
var router = express.Router();
var models = require('../models');
var expressValidator = require('express-validator');
var globalTrue = 'success';
var globalFalse = 'failed';


// insert record
router.post('/', function(req, res, next) {	
	insertCategory(req,function(status){
		res.send(status);
	})
});

// fetch record
router.get('/', function(req, res, next) {
	getItem(function(category){
		res.send(category);
	})	
});

module.exports = router;

// get category
function getItem(callback){
	models.categorys.findAll({			
	}).then(function (result) {    	
    	callback(result);
	});
}

function checkInsert(data,callback){	
	data.checkBody('name' , false).isExist();	
	if (data.validationErrors()){		
		callback(false);
		return;		
	}
	callback(true);
}

function insertCategory(data,callback){
	checkInsert(data,function(status){
		if (!status){
			callback(globalFalse);
			return;		
		}
		models.categorys.create({
  		name : data.body.name,  		
	  	}).then(function(createdItem){  		
	  		callback(globalTrue);
	  	}).catch(function(err){
	  		callback(globalFalse);
	  	}) 
	})	
}