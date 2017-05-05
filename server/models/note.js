module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define('Note', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'The "Name" field is Required!',
        },
        len: {
          args: [1, 18],
          msg: 'The "Name" field must be from 1 to 18 characters!',
        },
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    classMethods: {
      associate: (models) => {
        Note.belongsTo(models.Folder, {
          foreignKey: 'folderId',
          onDelete: 'CASCADE',
        });
        Note.hasMany(models.Tag, {
          foreignKey: 'noteId',
          as: 'tags',
        });
      },
    },
  });
  return Note;
};
