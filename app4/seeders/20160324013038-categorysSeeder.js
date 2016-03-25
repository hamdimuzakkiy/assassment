'use strict';
var Chance = require('chance');
var chance = new Chance();

module.exports = {
  up: function (queryInterface, Sequelize) {
    function generateCategorys(){
      var category = {
        name : chance.word(),        
        createdAt: new Date(),
        updatedAt: new Date(),                            
      };
      return category;
    }
    var categorys = [];
    for (var i=0;i<10;i++){
      categorys.push(generateCategorys());
    }     
    return queryInterface.bulkInsert('categorys',
    categorys    
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
