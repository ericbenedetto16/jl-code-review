'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('bills', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id',
                },
                onUpdate: 'cascade',
                onDelete: 'cascade',
            },
            company: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            due_date: {
                type: Sequelize.DATEONLY,
                allowNull: false,
            },
            amount: {
                type: Sequelize.DOUBLE,
                allowNull: false,
            },
            link: {
                type: Sequelize.STRING,
                allowNull: false,
            },
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('bills');
    },
};
