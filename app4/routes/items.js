var express = require('express');
var router = express.Router();
var models = require('../models');
var expressValidator = require('express-validator');
var globalTrue = 'success';
var globalFalse = 'failed';


// insert record
router.post('/', function(req, res, next) {	
  	insertItem(req,function(flag){
  		res.send(flag);
  	});
});

// delete record
router.delete('/', function(req, res, next) {
	deleteItem(req,function(flag){
  		res.send(flag);
  	});	
});

// update record
router.put('/', function(req, res, next) {	
	updateItem(req,function(flag){
  		res.send(flag);
  	});	
});

// fetch record
router.get('/', function(req, res, next) {	
	getItem(function(itemJson){
		res.send(itemJson);
	});
});

module.exports = router;

function getItem(callback){
	models.items.findAll({
		where : {deleted : false},
		include: [ models.categorys ]
	}).then(function (result) {    	
    	callback(result);
	});
}

function updateItem(data,callback){
	models.items.update({
		name : data.body.name,
		price : data.body.price,
		updatedAt : null,
	},{
		where : {
			id : data.body.id,
		}
	}).then(function(updated){
		callback(globalTrue);
	}).catch(function(err){
		callback(globalFalse);
	})
}

function checkInsert(data,callback){
	data.checkBody('name' , false).isExist();
	data.checkBody('price' , false).isExist();
	data.checkBody('categoryId' , false).isExist();
	if (data.validationErrors()){
		callback(false);
		return;		
	}
	callback(true);		
}

function insertItem(data,callback){
	checkInsert(data,function(status){
		if (!status){
			callback(globalFalse);
			return;		
		}
		models.items.create({
  		name : data.body.name,
  		price : data.body.price,
  		categoryId : data.body.categoryId,
	  	}).then(function(createdItem){  		
	  		callback(globalTrue);
	  	}).catch(function(err){
	  		callback(globalFalse);
	  	}) 
	})	
}

function deleteItem(data,callback){
	models.items.update({ 
		deleted : true},
	{
		where : {
			id : data.body.id,
		},
	}
	).then(function(updated){
		callback(globalTrue);
	}).catch(function(err){
		callback(globalFalse);
	})	
}