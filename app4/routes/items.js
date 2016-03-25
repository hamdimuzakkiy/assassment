var express = require('express');
var router = express.Router();
var models = require('../models');
var bodyParser = require('body-parser');
var globalTrue = 'success';
var globalFalse = 'failed';
// insert record
router.post('/', function(req, res, next) {		
  	insertItem(req.body,function(flag){
  		res.send(flag);
  	});
});

// delete record
router.delete('/', function(req, res, next) {
	deleteItem(req.body,function(flag){
  		res.send(flag);
  	});	
});

// update record
router.put('/', function(req, res, next) {	
	updateItem(req.body,function(flag){
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
		name : data.name,
		price : data.price,
		updatedAt : null,
	},{
		where : {
			id : data.id,
		}
	}).then(function(updated){
		callback(globalTrue);
	}).catch(function(err){
		callback(globalFalse);
	})
}

function insertItem(data,callback){
	console.log(data.categoryId);
	models.items.create({
  		name : data.name,
  		price : data.price,
  		categoryId : data.categoryId,
  	}).then(function(createdItem){  		
  		callback(globalTrue);
  	}).catch(function(err){
  		callback(globalFalse);
  	}) 
}

function deleteItem(data,callback){
	models.items.update({ 
		deleted : true},
	{
		where : {
			id : data.id,
		},
	}
	).then(function(updated){
		callback(globalTrue);
	}).catch(function(err){
		callback(globalFalse);
	})	
}