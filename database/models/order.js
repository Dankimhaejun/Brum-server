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
      title: {
        type: Datatypes.STRING,
        allowNull: false
      },
      departures: {
        type: Datatypes.STRING
      },
      arrivals: {
        type: Datatypes.STRING,
        allowNull: false
      },
      category: {
        type: Datatypes.STRING,
        allowNull: false
      },
      desiredArrivalTime: {
        type: Datatypes.DATE
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
      freezeTableName: true
    }
  );
  order.associate = function(db) {
    order.hasMany(db.applicant, { foreignKey: 'orderId' });
    order.hasMany(db.orderImage, { foreignKey: 'orderId' });
    order.belongsTo(db.user, { as: 'hostInfo', foreignKey: 'hostId' });
    order.belongsTo(db.user, { as: 'deliverInfo', foreignKey: 'deliverId' });
  };
  return order;
};
