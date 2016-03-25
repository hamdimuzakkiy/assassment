'use strict';
module.exports = function(sequelize, DataTypes) {
  var categorys = sequelize.define('categorys', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        categorys.hasMany(models.items,{})
      }
    }, instanceMethods: {
        toJSON: function () {
          var values = this.get();

          delete values.createdAt;
          delete values.updatedAt;          
          return values;
        }
      }
  });
  return categorys;
};