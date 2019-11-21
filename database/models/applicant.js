const db = require('./index');

module.exports = function(sequelize, Datatypes) {
  const applicant = sequelize.define(
    'applicant',
    {
      applicantId: {
        type: Datatypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      orderId: {
        type: Datatypes.INTEGER,
        allowNull: false
      },
      userId: {
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
    applicant.belongsTo(db.order, {
      foreignKey: 'orderId'
    });
    applicant.belongsTo(db.user, { as: 'applicant', foreignKey: 'userId' });
  };
  return applicant;
};
