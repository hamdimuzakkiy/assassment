'use strict';
var models = require('../models');

module.exports = {
  up: function (queryInterface, Sequelize) {    
    for (var i=0;i<5;i++){return queryInterface.bulkInsert('items',[    
    {      
      name:'name2',
      price: parseInt(Math.random()*(10000000-0)),      
      categoryId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),                          
    },
    ]);}    
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
