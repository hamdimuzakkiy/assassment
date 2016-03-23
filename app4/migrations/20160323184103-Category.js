'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.createTable('categorys',{
      id : {
          type : Sequelize.INTEGER,
          primaryKey : true,
          autoIncrement : true,
        },
        createdAt : {
          type : Sequelize.DATE,
        },
        updatedAt : {
          type : Sequelize.DATE,
        },
        name : {
          type : Sequelize.STRING,
        },
      })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('categorys');
  }
};
