module.exports = function (sequelize, DataTypes) {
    


var Userpost = sequelize.define('Userpost', { 
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    newPost: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
  }, {
      getterMethods: {
          fullName: () => {
            return this.firstName + ' ' + this.lastName;
        
      }
  }
   
})
    return Userpost;
}