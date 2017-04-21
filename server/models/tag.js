module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    label: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
