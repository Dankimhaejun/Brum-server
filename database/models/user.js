const models = require('../models/index');

module.exports = function(sequelize, Datatypes) {
  const user = sequelize.define(
    'user',
    {
      phone: {
        type: Datatypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Datatypes.STRING,
        allowNull: false
      },
      name: {
        type: Datatypes.STRING,
        allowNull: true
      },
      sex: {
        type: Datatypes.STRING,
        allowNull: false
      },
      age: {
        type: Datatypes.STRING
      },
      university: {
        type: Datatypes.STRING
      },
      major: {
        type: Datatypes.STRING
      },
      introduction: {
        type: Datatypes.STRING
      },
      image: {
        type: Datatypes.STRING
      },
      agreementAd: {
        type: Datatypes.BOOLEAN
      }
    },
    {
      underscored: false,
      freezeTableName: true
    }
  );
  user.associate = function(db) {
    user.hasOne(db.request, { foreignKey: 'hostId' });
    user.hasOne(db.request, { foreignKey: 'deliverId' });
  };
  return user;
};
