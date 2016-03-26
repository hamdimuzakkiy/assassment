var express = require('express');
var router = express.Router();
var nodeCache = require('node-cache');
var caches = new nodeCache();
var router = require('express-promise-router')();
var models = require('../models');
var expressValidator = require('express-validator')
//var globalCache = "salestockCache";
var Sequelize = require('sequelize');

// set cache
router.post('/', function(req, res, next) {	
	var cacheId = req.connection.remoteAddress.toString();
	getCache(cacheId,function(cacheObject){		
		insertCache(cacheId,cacheObject,req,function(status){
			res.send(status);
		})
	});		
});

router.get('/', function(req, res, next){	
	var cacheId = req.connection.remoteAddress.toString();
	getCartDetail(cacheId,function(cartDetail){
		res.send(cartDetail);
	})
});

router.delete('/', function(req, res, next){
	var cacheId = req.connection.remoteAddress.toString();
	deleteCart(cacheId,req.body,function(status){
		res.send(status);
	})
});

module.exports = router;

function deleteCart(cacheId,data,callback){
	getCache(cacheId,function(cacheObject){
		if (cacheObject == null){
			callback(false);
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
		setCache(cacheId,cacheObject,function(status){
			callback(true);
		})		
	})
}

function getCache(cacheId,callback){
	caches.get(cacheId, function(err, cacheObject){
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

function getDiscount(code,callback){	
	models.coupons.findAll({
		where : Sequelize.and({isUsed : 0},{code:code}),		
	}).then(function (result) { 
		if (result[0] == null)
			result = 0;
		else
			result = result[0]['dataValues']['value']   	
    	callback(result.toString());
	});
}

//function list of cart
function getCartDetail(cacheId,callback){
	getCache(cacheId,function(cacheObject){				
		if (cacheObject == null){			
			callback({item:[],total:0,discount:0,totalPurchase:0});		
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
			getDiscount(cacheObject['coupon'],function(discountValue){				
				calculateItems(cartItem, function(totalPrice){																								
						var totalPurchase = parseInt(totalPrice) - parseInt(discountValue);
						if (totalPurchase<0)
							totalPurchase = 0;
						var result = {item:cartItem
							,total:parseInt(totalPrice)						
							,discount:discountValue
							,totalPurchase:totalPurchase
						};
						callback(result);													
					})				
			})			
		})		
	})	
}

//function insertCache to Item
function setCache(cacheId,cacheObject ,callback){	
	caches.set(cacheId, cacheObject, function(err, success){
		if (!err && success)
			callback(true);
		else
			callback(false);
	});
}

function checkInsert(data,callback){
	data.checkBody('type' , false).isExist();
	data.checkBody('id' , false).isExist();	
	if (data.validationErrors()){		
		callback(false);
		return;		
	}
	callback(true);
}

function insertCache(cacheId,cacheObject, data ,callback){
	checkInsert(data,function(status){
		if (!status){
			callback(false);
			return;
		}
		if (cacheObject == null)
		cacheObject = {item:[],coupon:[]};		
		if (data.body.type == 'coupon')
			cacheObject['coupon'] = data.body.id;	
		else 
			cacheObject['item'].push(data.body.id);
		setCache(cacheId,cacheObject,function(status){
			callback(status);
		})
	})	
}