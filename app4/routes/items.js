var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET home page. */
router.post('/', function(req, res, next) {
  res.render('index', { title: 'items' });
});

router.get('/', function(req, res, next) {			
  	res.send(models.items.findAll());
});

module.exports = router;
