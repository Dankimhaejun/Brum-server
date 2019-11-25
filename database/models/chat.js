const db = require('./index');

module.exports = function(sequelize, Datatypes) {
  const chat = sequelize.define(
    'chat',
    {
      chatId: {
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
      chatDetail: {
        type: Datatypes.STRING
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
  chat.associate = function(db) {
    chat.belongsTo(db.user, { foreignKey: 'userId' });
    chat.belongsTo(db.order, { foreignKey: 'orderId' });
  };
  return chat;
};
