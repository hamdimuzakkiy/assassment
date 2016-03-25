'use strict';
module.exports = function(sequelize, DataTypes) {
  var items = sequelize.define('items', {
    name : {
      type : DataTypes.STRING,
      validate : {
        notNull: true,      
      }
    },
    price : {
      type : DataTypes.INTEGER,
      validate : {
        notNull: true,
        isInt: true, 
      }
    },
    categoryId: {
      type : DataTypes.INTEGER,
      validate : {
        notNull: true,
        isInt: true, 
      } 
    },
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