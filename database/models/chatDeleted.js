const db = require('./index');

module.exports = function(sequelize, Datatypes) {
  const chatDeleted = sequelize.define(
    'chatDeleted',
    {
      chatDeletedId: {
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
      isDeleted: {
        type: Datatypes.BOOLEAN,
        defaultValue: false
      }
    },
    {
      underscored: false,
      freezeTableName: true
    }
  );
  chatDeleted.associate = function(db) {
    chatDeleted.belongsTo(db.order, { foreignKey: 'orderId' });
    chatDeleted.belongsTo(db.user, { foreignKey: 'userId' });
  };
  return chatDeleted;
};
