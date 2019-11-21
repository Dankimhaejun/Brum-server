const db = require('./index');

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
        allowNull: false
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
        type: Datatypes.BOOLEAN,
        defaultValue: false
      },
      isAdmin: {
        type: Datatypes.BOOLEAN,
        defaultValue: false
      }
    },
    {
      underscored: false,
      freezeTableName: true
    }
  );
  user.associate = function(db) {
    user.belongsToMany(db.request, {
      through: 'applicant',
      as: 'applicantUsers',
      foreignKey: 'applicantId'
    });
    user.hasMany(db.applicant, { foreignKey: 'applicantId' });
    user.hasMany(db.request, { foreignKey: 'hostId' });
    user.hasMany(db.request, { foreignKey: 'deliverId' });
    user.hasMany(db.mannerRate, { foreignKey: 'rateeId' });
    user.hasMany(db.mannerRate, { foreignKey: 'raterId' });
  };
  return user;
};
