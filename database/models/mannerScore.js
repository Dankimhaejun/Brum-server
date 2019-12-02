const db = require('./index');

module.exports = function(sequelize, Datatypes) {
  const mannerScore = sequelize.define(
    'mannerScore',
    {
      mannerScoreId: {
        type: Datatypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      orderId: {
        type: Datatypes.INTEGER,
        allowNull: false
      },
      evaluatorId: {
        type: Datatypes.INTEGER,
        allowNull: false
      },
      receiverId: {
        type: Datatypes.INTEGER,
        allowNull: false
      },
      score: {
        type: Datatypes.INTEGER,
        allowNull: false
      },
      review: {
        type: Datatypes.STRING
      }
    },
    {
      underscored: false,
      freezeTableName: true
    }
  );
  mannerScore.associate = function(db) {
    mannerScore.belongsTo(db.user, {
      as: 'evaluator',
      foreignKey: 'evaluatorId'
    });
    mannerScore.belongsTo(db.user, { as: 'getScore', foreignKey: 'receiverId' });
    mannerScore.belongsTo(db.order, {
      foreignKey: 'orderId'
    });
  };
  return mannerScore;
};
