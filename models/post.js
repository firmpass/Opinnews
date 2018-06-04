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