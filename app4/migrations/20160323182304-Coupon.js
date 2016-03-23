'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.createTable('coupons',{
      id : {
          type : Sequelize.INTEGER,
          primaryKey : true,
          autoIncrement : true,
        },
      value : {
          type : Sequelize.INTEGER,        
      },
      used : {
          type : Sequelize.BOOLEAN,        
      },
      createdAt : {
          type : Sequelize.DATE,
      },
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('coupons');
  }
};
