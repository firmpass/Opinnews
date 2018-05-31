//user table
module.exports = function (sequelize, DataTypes) {
    


    var User = sequelize.define('User', { 
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
        nickName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
        legit: {
            type: DataTypes.INTEGER,
        },
        seemslegit: {
            type: DataTypes.INTEGER,
        },
        fakeNews: {
            type: DataTypes.INTEGER,
        },
        password: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true
            }
        }
      }, {
          getterMethods: {
              fullName: () => {
                return this.firstName + ' ' + this.lastName;
            
          }
      }
       
    })
        return User;
    }