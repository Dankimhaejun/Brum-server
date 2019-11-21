const db = require('./index');

module.exports = function(sequelize, Datatypes) {
  const applicant = sequelize.define(
    'applicant',
    {
      id: {
        type: Datatypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      requestId: {
        type: Datatypes.INTEGER,
        allowNull: false
      },
      applicantId: {
        type: Datatypes.INTEGER,
        allowNull: false
      },
      bidPrice: {
        type: Datatypes.STRING,
        defaultValue: null
      },
      applyStatus: {
        type: Datatypes.STRING,
        defaultValue: 'applied'
      }
    },
    {
      underscored: false,
      freezeTableName: true
    }
  );
  applicant.associate = function(db) {
    applicant.belongsTo(db.request, {
      foreignKey: 'requestId'
    });
    applicant.belongsTo(db.user, { foreignKey: 'applicantId' });
  };
  return applicant;
};
