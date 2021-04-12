const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Session extends Model {}

    Session.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id',
                },
            },
            session_token: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'Session',
            tableName: 'sessions',
        }
    );

    Session.associate = (models) => {
        Session.belongsTo(models.User, { foreignKey: 'user_id' });
    };

    return Session;
};
