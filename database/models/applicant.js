const db = require('./index');

module.exports = function(sequelize, Datatypes) {
  const applicant = sequelize.define(
    'applicant',
    {
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
      as: 'applicantRequest',
      foreignKey: 'requestId'
    });
    applicant.belongsTo(db.user, { as: 'applicant', foreignKey: 'applicantId' });
  };
  return applicant;
};
