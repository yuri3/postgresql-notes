module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Tags', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      label: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      noteId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Notes',
          key: 'id',
          as: 'noteId',
        },
      },
    }),
  down: (queryInterface/*, Sequelize*/) => queryInterface.dropTable('Tags'),
};
