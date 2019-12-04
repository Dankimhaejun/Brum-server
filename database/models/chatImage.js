const db = require('./index');

module.exports = function(sequelize, Datatypes) {
  const chatImage = sequelize.define(
    'chatImage',
    {
      chatImageId: {
        type: Datatypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      orderId: {
        type: Datatypes.INTEGER,
        allowNull: false
      },
      userId: {
        type: Datatypes.INTEGER,
        allowNull: false
      },
      chatImageURL: {
        type: Datatypes.STRING,
        allowNull: false
      }
    },
    {
      underscored: false,
      freezeTableName: true
    }
  );
  chatImage.associate = function(db) {
    chatImage.belongsTo(db.user, { foreignKey: 'userId' });
    chatImage.belongsTo(db.order, { foreignKey: 'orderId' });
  };
  return chatImage;
};
