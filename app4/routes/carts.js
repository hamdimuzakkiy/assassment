var express = require('express');
var router = express.Router();
var nodeCache = require('node-cache');
var caches = new nodeCache();
var router = require('express-promise-router')();
var globalCache = "salestockCache";
var models = require('../models');
var Sequelize = require('sequelize');

// set cache
router.post('/', function(req, res, next) {
	getCache(function(cacheObject){		
		setCache(cacheObject,req.body,function(result){
			res.send(result);
		})
	});		
});

router.get('/', function(req, res, next){
	getCartDetail(function(cartDetail){
		res.send(cartDetail);
	})
});

router.delete('/', function(res,req, next){
	
});

module.exports = router;

function getCache(callback){
	caches.get(globalCache, function(err, cacheObject){
		if (!err)
			callback(cacheObject);
		else
			callback(false);
	})
}

// calcuate item
function getItems(listItem,callback){
	models.items.findAll({
		where : Sequelize.and({deleted : false},{id:listItem}),
		include: [ models.categorys ]
	}).then(function (result) {    	
    	callback(result);
	});
}

// calculate total price
function calculateItems(cartDetail,callback){		
	var total = 0;	
	for (var i in cartDetail){			
		total+=(cartDetail[i]['dataValues']['price']*cartDetail[i]['dataValues']['count']);		
	}
	callback(total.toString());
}

//function list of cart
function getCartDetail(callback){
	getCache(function(cacheObject){				
		if (cacheObject == null){			
			callback(null);		
			return;
		}							
		getItems(cacheObject['item'],function(cartItem){
			var listDistinct = new Map();					
			for (var i in cacheObject['item']){				
				if (listDistinct.get(cacheObject['item'][i]) == null)
					listDistinct.set(cacheObject['item'][i],1);
				else
					listDistinct.set(cacheObject['item'][i],listDistinct.get(cacheObject['item'][i])+1);
			}			
			for (var i in cartItem){
				var id = cartItem[i]['dataValues']['id'];
				cartItem[i]['dataValues']['count'] = listDistinct.get(id.toString());				
			}
			calculateItems(cartItem, function(totalPrice){			
				callback(totalPrice);							
			})				
		})		
	})	
}

//function getTotal
function setCache(objects, data ,callback){	
	if (objects == null)
		objects = {item:[],discount:[]};		
	if (data.type == 'discount')
		objects[data.type] = data.value;	
	else
		objects[data.type].push(data.value);
	caches.set(globalCache, objects, function(err, success){
		if (!err && success)
			callback(true);
		else
			callback(false);
	});
}