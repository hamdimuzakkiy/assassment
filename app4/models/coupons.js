'use strict';
module.exports = function(sequelize, DataTypes) {
  var coupons = sequelize.define('coupons', {
    code: DataTypes.STRING,
    value: DataTypes.INTEGER,
    isUsed: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
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
  return coupons;
};