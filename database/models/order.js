const db = require('./index');

module.exports = function(sequelize, Datatypes) {
  const order = sequelize.define(
    'order',
    {
      orderId: {
        type: Datatypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      views: {
        type: Datatypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      hostId: {
        type: Datatypes.INTEGER,
        allowNull: false
      },
      campus: {
        type: Datatypes.STRING,
        allowNull: false
      },
      title: {
        type: Datatypes.STRING,
        allowNull: false
      },
      departures: {
        type: Datatypes.STRING
      },
      depLat: {
        type: Datatypes.STRING
      },
      depLng: {
        type: Datatypes.STRING
      },
      arrivals: {
        type: Datatypes.STRING,
        allowNull: false
      },
      arrLat: {
        type: Datatypes.STRING
      },
      arrLng: {
        type: Datatypes.STRING
      },
      category: {
        type: Datatypes.STRING,
        allowNull: false
      },
      thumbnailURL: {
        type: Datatypes.STRING,
        allowNull: false
      },
      desiredArrivalTime: {
        type: Datatypes.STRING,
        defaultValue: null
      },
      details: {
        type: Datatypes.STRING,
        allowNull: false
      },
      price: {
        type: Datatypes.STRING
      },
      isPrice: {
        type: Datatypes.BOOLEAN,
        defaultValue: false
      },
      deliverId: {
        type: Datatypes.INTEGER
      },
      orderStatus: {
        type: Datatypes.INTEGER,
        defaultValue: 0
      },
      actualArrivalTime: {
        type: Datatypes.STRING
      }
    },
    {
      underscored: false,
      freezeTableName: true,
      paranoid: true
    }
  );
  order.associate = function(db) {
    order.hasMany(db.applicant, { foreignKey: 'orderId' });
    order.hasMany(db.orderImage, { foreignKey: 'orderId' });
    order.belongsTo(db.user, { as: 'hostInfo', foreignKey: 'hostId' });
    order.belongsTo(db.user, { as: 'deliverInfo', foreignKey: 'deliverId' });
    order.hasMany(db.chat, { foreignKey: 'orderId' });
    order.hasMany(db.userLikeOrder, { foreignKey: 'orderId' });
    order.hasMany(db.review, { foreignKey: 'orderId' });
  };
  return order;
};
