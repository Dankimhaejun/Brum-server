const db = require('./index');

module.exports = function(sequelize, Datatypes) {
  const mannerRate = sequelize.define(
    'mannerRate',
    {
      raterId: {
        type: Datatypes.INTEGER,
        allowNull: false
      },
      rateeId: {
        type: Datatypes.INTEGER,
        allowNull: false
      },
      rate: {
        type: Datatypes.FLOAT
      }
    },
    {
      underscored: false,
      freezeTableName: true
    }
  );
  mannerRate.associate = function(db) {
    mannerRate.belongsTo(db.user, { as: 'rater', foreignKey: 'raterId' });
    mannerRate.belongsTo(db.user, { as: 'ratee', foreignKey: 'rateeId' });
  };
  return mannerRate;
};
