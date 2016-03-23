'use strict';
module.exports = function(sequelize, DataTypes) {
  var items = sequelize.define('items', {
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });  
  return items;
};