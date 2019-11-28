const db = require('./index');

module.exports = function(sequelize, Datatypes) {
  const orderImage = sequelize.define(
    'orderImage',
    {
      orderImageId: {
        type: Datatypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      orderId: {
        type: Datatypes.INTEGER,
        allowNull: false
      },
      orderImageURL: {
        type: Datatypes.STRING,
        allowNull: false
      }
    },
    {
      underscored: false,
      freezeTableName: true,
      paranoid: true
    }
  );
  orderImage.associate = function(db) {
    orderImage.belongsTo(db.order, { foreignKey: 'orderId' });
  };
  return orderImage;
};
