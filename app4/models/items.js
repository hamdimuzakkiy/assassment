'use strict';
module.exports = function(sequelize, DataTypes) {
  var items = sequelize.define('items', {
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    deleted : DataTypes.BOOLEAN,
  }, {
    classMethods: {
      associate: function(models) {
        items.belongsTo(models.categorys,{

        })
      }
    }
  });
  return items;
};