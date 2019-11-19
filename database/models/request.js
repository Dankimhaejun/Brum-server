const db = require('./index');

module.exports = function(sequelize, Datatypes) {
  const request = sequelize.define(
    'request',
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
        type: Datatypes.STRING,
        allowNull: false
      },
      details: {
        type: Datatypes.STRING
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
        type: Datatypes.BOOLEAN,
        defaultValue: false
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
  request.associate = function(db) {
    request.hasMany(db.requestImage, { foreignKey: 'requestId' });
    request.belongsTo(db.user, { as: 'host', foreignKey: 'hostId' });
    request.belongsTo(db.user, { as: 'deliver', foreignKey: 'deliverId' });
  };
  return request;
};
