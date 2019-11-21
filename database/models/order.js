const db = require('./index');

module.exports = function(sequelize, Datatypes) {
  const order = sequelize.define(
    'order',
    {
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
      desiredArrivalTime: {
        type: Datatypes.STRING
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
      isCompleted: {
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
    order.belongsToMany(db.user, {
      through: 'applicant',
      as: 'applicantOrders',
      foreignKey: 'orderId'
    });
    order.hasMany(db.applicant, { foreignKey: 'orderId' });
    order.hasMany(db.orderImage, { foreignKey: 'orderId' });
    order.belongsTo(db.user, { as: 'host', foreignKey: 'hostId' });
    order.belongsTo(db.user, { as: 'deliver', foreignKey: 'deliverId' });
  };
  return order;
};
