'use strict';
var Chance = require('chance');
var chance = new Chance();

module.exports = {
  up: function (queryInterface, Sequelize) {
      function generateCoupons(){
        var coupon = {
          code : chance.hash({length: 22}),
          value: chance.integer({min: 100000, max: 100000000}),
          createdAt: new Date(),
          updatedAt: new Date(),                            
        };
        return coupon;
      }
      var coupons = [];
      for (var i=0;i<10;i++){
        coupons.push(generateCoupons());
      }     
      return queryInterface.bulkInsert('coupons',
      coupons    
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
