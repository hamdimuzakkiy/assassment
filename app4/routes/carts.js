var express = require('express');
var router = express.Router();
var nodeCache = require('node-cache');
var caches = new nodeCache();
var router = require('express-promise-router')();
var globalCache = "salestockCache";
// set cache
router.post('/', function(req, res, next) {
	getCache(function(cacheObject){		
		setCache(cacheObject,req.body,function(result){
			res.send(result);
		})
	});		
});

// get cache
router.get('/', function(req, res, next){
	getCache(function(cacheObject){
		res.send(cacheObject);
	})
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

function setCache(objects, data ,callback){	
	if (objects == null)
		objects = {item:[],discount:[]};
	var tmpJson = {};
	tmpJson['value'] = data.value;	
	objects[data.type].push(tmpJson);
	caches.set(globalCache, objects, function(err, success){
		if (!err && success)
			callback(true);
		else
			callback(false);
	});
}