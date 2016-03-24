var express = require('express');
var router = express.Router();
var models = require('../models');
var bodyParser = require('body-parser');

// insert record
router.post('/', function(req, res, next) {			
  	models.items.create({
  	name : req.body.name,
  	price : req.body.price,
  	categoryId : req.body.categoryId,
  	}).then(function(createdItem){  		
  		res.send(true);
  	}).catch(function(err){
  		res.send(false);
  	}) 
});


// delete record
router.delete('/', function(req, res, next) {	
	models.items.update(
	{ deleted : true},
	{where : {
		id : req.body.id,},
	}
	).then(function(updated){
		res.send(true);
	}).catch(function(err){
		res.send(false);
	})
});

// update record
router.put('/', function(req, res, next) {	
	models.items.update(
		{
			name : req.body.name,
			price : req.body.price,
			updatedAt : null,
		},
		{
			where : {
				id : req.body.id,
			}
		}
	).then(function(updated){
		res.send(true);
	}).catch(function(err){
		res.send(false);
	})	
});

// fetch record
router.get('/', function(req, res, next) {	
	models.items.findAll({
		where : {deleted : false},
		include: [ models.categorys ]
	}).then(function (result) {    	
    	res.send(result);
	});
});



module.exports = router;
