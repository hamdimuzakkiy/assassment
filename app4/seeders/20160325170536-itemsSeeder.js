'use strict';
var models = require('../models');
var Chance = require('chance');
var chance = new Chance();

module.exports = {
  up: function (queryInterface, Sequelize) {      
        function generateItems(){
          var item = {
            name : chance.word(),
            price: chance.integer({min: 100000, max: 100000000}),
            categoryId: chance.integer({min:1,max:10}),
            createdAt: new Date(),
            updatedAt: new Date(),                            
          };
          return item;
        }        
        var items = [];
        for (var i=0;i<10;i++){
          items.push(generateItems());
        }            
        return queryInterface.bulkInsert('items',
        items    
        );    
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
