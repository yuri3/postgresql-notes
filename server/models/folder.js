module.exports = (sequelize, DataTypes) => {
  const Folder = sequelize.define('Folder', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    classMethods: {
      associate: (models) => {
        Folder.hasMany(Folder, {
          foreignKey: 'parentId',
        });
        Folder.belongsTo(Folder, {
          foreignKey: 'parentId',
          onDelete: 'CASCADE',
        });
        Folder.hasMany(models.Note, {
          foreignKey: 'folderId',
          as: 'notes',
        });
      },
    },
  });
  return Folder;
};
