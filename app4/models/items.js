'use strict';
module.exports = function(sequelize, DataTypes) {
  var items = sequelize.define('items', {
    name : {
      type : DataTypes.STRING,
      validate : {
      }
    },
    price : {
      type : DataTypes.INTEGER,
      validate : {        
        isInt: true,         
      }
    },
    categoryId: {
      type : DataTypes.INTEGER,      
      validate : {        
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
    },    
  });
  return items;
};