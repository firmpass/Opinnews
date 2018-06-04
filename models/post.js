<<<<<<< HEAD
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
    user_id: {
        type: DataTypes.STRING
    }
//   }, {
//       getterMethods: {
//           fullName: () => {
//             return this.firstName + ' ' + this.lastName;
        
//       }
//   }
   
})
    return Userpost;
}
=======
module.exports = function(sequelize, DataTypes) {
    var Post = sequelize.define("Post", {
        user: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: false,
            len: [1]
        },
        fakeNews: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        legitNews: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        seemsLegitNews: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    });

    return Post;
};
>>>>>>> 09bc7515259420524a44025fbb399859bf60f044
