'use strict';
module.exports = function(sequelize, DataTypes) {
  var coupons = sequelize.define('coupons', {
    value: DataTypes.INTEGER,
    used: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return coupons;
};