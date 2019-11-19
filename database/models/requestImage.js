const db = require('./index');

module.exports = function(sequelize, Datatypes) {
  const requestImage = sequelize.define(
    'requestImage',
    {
      requestId: {
        type: Datatypes.INTEGER,
        allowNull: false
      },
      requestImage: {
        type: Datatypes.STRING,
        allowNull: false
      }
    },
    {
      underscored: false,
      freezeTableName: true
    }
  );
  requestImage.associate = function(db) {
    requestImage.belongsTo(db.request, { foreignKey: 'requestId' });
  };
  return requestImage;
};
