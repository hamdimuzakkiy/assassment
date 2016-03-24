'use strict';
module.exports = function(sequelize, DataTypes) {
  var categorys = sequelize.define('categorys', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        categorys.hasMany(models.items,{})
      }
    }
  });
  return categorys;
};