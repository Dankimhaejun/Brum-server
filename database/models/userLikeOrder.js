const db = require('./index');

module.exports = function(sequelize, Datatypes) {
  const userLikeOrder = sequelize.define(
    'userLikeOrder',
    {
      userLikeOrderId: {
        type: Datatypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      userId: {
        type: Datatypes.INTEGER,
        allowNull: false
      },
      orderId: {
        type: Datatypes.INTEGER,
        allowNull: false
      },
      likeOrder: {
        type: Datatypes.BOOLEAN,
        defaultValue: true
      }
    },
    {
      underscored: false,
      freezeTableName: true
    }
  );
  userLikeOrder.associate = function(db) {
    userLikeOrder.belongsTo(db.order, {
      foreignKey: 'orderId'
    });
    userLikeOrder.belongsTo(db.user, {
      foreignKey: 'userId'
    });
  };
  return userLikeOrder;
};
