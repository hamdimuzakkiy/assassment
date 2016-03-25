var express = require('express');
var router = express.Router();
var nodeCache = require('node-cache');
var caches = new nodeCache();
var router = require('express-promise-router')();
var models = require('../models');
var globalTrue = 'success';
var globalFalse = 'failed';
var globalCache = "salestockCache";


// set cache
router.post('/', function(req, res, next) {
	getCache(function(cacheObject){		
		insertCache(cacheObject,req.body,function(status){
			res.send(status);
		})
	});		
});

router.get('/', function(req, res, next){
	getCartDetail(function(cartDetail){
		res.send(cartDetail);
	})
});

router.delete('/', function(req, res, next){
	deleteCart(req.body,function(status){
		res.send(status);
	})
});

module.exports = router;

function deleteCart(data,callback){
	getCache(function(cacheObject){
		if (cacheObject == null){
			callback(globalFalse);
			return;
		}
		var index = null;
		for(var i in cacheObject['item']){
			if (cacheObject['item'][i] == data.id){
				index = i;
				break;
			}
		}		
		if (index != null)		
			cacheObject['item'].splice(index,1);
		setCache(cacheObject,function(status){
			callback(globalTrue);
		})		
	})
}

function getCache(callback){
	caches.get(globalCache, function(err, cacheObject){
		if (!err)
			callback(cacheObject);
		else
			callback(globalFalse);
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
					listDistinct.set(cacheObject['item'][i]
					,listDistinct.get(cacheObject['item'][i])+1);
			}			
			for (var i in cartItem){
				var id = cartItem[i]['dataValues']['id'];
				cartItem[i]['dataValues']['count'] = listDistinct.get(id.toString());				
			}			
			calculateItems(cartItem, function(totalPrice){			
				var result = {item:cartItem,total:totalPrice};
				callback(result);							
			})				
		})		
	})	
}

//function insertCache to Item
function setCache(cacheObject ,callback){	
	caches.set(globalCache, cacheObject, function(err, success){
		if (!err && success)
			callback(globalTrue);
		else
			callback(globalFalse);
	});
}

function insertCache(cacheObject, data ,callback){
	if (cacheObject == null)
		cacheObject = {item:[],coupon:[]};		
	if (data.type == 'coupon')
		cacheObject[data.type] = data.id;	
	else
		cacheObject[data.type].push(data.id);
	setCache(cacheObject,function(status){
		callback(status);
	})
}