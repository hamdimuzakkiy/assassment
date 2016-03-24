var express = require('express');
var router = express.Router();
var models = require('../models');
var bodyParser = require('body-parser');

// insert record
router.post('/', function(req, res, next) {	
  	InsertItem(req.body,function(flag){
  		res.send(flag);
  	});
});

// delete record
router.delete('/', function(req, res, next) {
	DeleteItem(req.body,function(flag){
  		res.send(flag);
  	});	
});

// update record
router.put('/', function(req, res, next) {	
	UpdateItem(req.body,function(flag){
  		res.send(flag);
  	});	
});

// fetch record
router.get('/', function(req, res, next) {	
	GetItem(function(itemJson){
		res.send(itemJson);
	});
});

module.exports = router;

function GetItem(callback){
	models.items.findAll({
		where : {deleted : false},
		include: [ models.categorys ]
	}).then(function (result) {    	
    	callback(result);
	});
}

function UpdateItem(data,callback){
	models.items.update({
		name : data.name,
		price : data.price,
		updatedAt : null,
	},{
		where : {
			id : data.id,
		}
	}).then(function(updated){
		callback(true);
	}).catch(function(err){
		callback(false);
	})
}

function InsertItem(data,callback){
	models.items.create({
  		name : data.name,
  		price : data.price,
  		categoryId : data.categoryId,
  	}).then(function(createdItem){  		
  		callback(true);
  	}).catch(function(err){
  		callback(false);
  	}) 
}

function DeleteItem(data,callback){
	models.items.update({ 
		deleted : true},
	{
		where : {
			id : data.id,
		},
	}
	).then(function(updated){
		callback(true);
	}).catch(function(err){
		callback(false);
	})	
}