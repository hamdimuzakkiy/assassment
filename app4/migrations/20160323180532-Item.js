'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.createTable('items',{
      id : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true,
      },
      createdAt : {
        type : Sequelize.DATE
      },
      updatedAt : {
        type : Sequelize.DATE
      },
      name : {
        type : Sequelize.STRING
      },
      price : {
        type : Sequelize.INTEGER
      },
      category_id : {
        type : Sequelize.INTEGER
      }
    })    
  },

  down: function (queryInterface, Sequelize) {    
      return queryInterface.dropTable('items');    
  }
};
