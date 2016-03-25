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
    }
  });
  return coupons;
};