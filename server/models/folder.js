module.exports = (sequelize, DataTypes) => {
  const Folder = sequelize.define('Folder', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [1, 18],
          msg: 'The folder name must be from 1 to 18 characters!',
        },
      },
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
