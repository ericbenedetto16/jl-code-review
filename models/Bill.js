const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Bill extends Model {}

    Bill.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            // FOREIGN KEY
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id',
                },
            },
            company: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            due_date: {
                type: DataTypes.DATEONLY,
                allowNull: false,
            },
            amount: {
                type: DataTypes.DOUBLE,
                allowNull: false,
            },
            link: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'Bill',
            tableName: 'bills',
        }
    );

    Bill.associate = (models) => {
        Bill.belongsTo(models.User, { foreignKey: 'user_id' });
    };

    return Bill;
};
