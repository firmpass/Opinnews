module.exports = function (sequelize, DataTypes) {
    


var Userpost = sequelize.define('Userpost', { 
    userName: {
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
    legit: {
        type: DataTypes.INTEGER,
    },
    seemslegit: {
        type: DataTypes.INTEGER,
    },
    fakeNews: {
        type: DataTypes.INTEGER,
    },
//   }, {
//       getterMethods: {
//           fullName: () => {
//             return this.firstName + ' ' + this.lastName;
        
//       }
//   }
   
})
    return Userpost;
}