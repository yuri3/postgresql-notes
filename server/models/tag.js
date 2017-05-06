module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    label: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUppercase: {
          args: true,
          msg: 'The "Tag" field must be uppercase!',
        },
        len: {
          args: [1, 18],
          msg: 'The "Tag" field must be from 1 to 18 characters!',
        },
      }
    },
  }, {
    classMethods: {
      associate: (models) => {
        Tag.belongsTo(models.Note, {
          foreignKey: 'noteId',
          onDelete: 'CASCADE',
        });
      },
    },
  });
  return Tag;
};
