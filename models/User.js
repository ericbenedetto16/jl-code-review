const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {}

    User.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            firstName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'User',
            tableName: 'users',
        }
    );

    User.associate = (models) => {
        User.hasMany(models.Bill, { foreignKey: 'user_id' });
        User.hasOne(models.Session, { foreignKey: 'user_id' });
    };

    return User;
};
