'use strict';

module.exports = function(sequelize, DataTypes) {
  var categorys = sequelize.define('categorys', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return categorys;
};