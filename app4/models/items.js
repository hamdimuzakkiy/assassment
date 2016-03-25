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
    }, instanceMethods: {
        toJSON: function () {
          var values = this.get();

          delete values.createdAt;
          delete values.updatedAt;
          delete values.deleted;
          return values;
        }
      }    
  });
  return items;
};