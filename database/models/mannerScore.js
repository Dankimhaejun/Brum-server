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
      evaluatorId: {
        type: Datatypes.INTEGER,
        allowNull: false
      },
      receiverId: {
        type: Datatypes.INTEGER,
        allowNull: false
      },
      score: {
        type: Datatypes.INTEGER
      }
    },
    {
      underscored: false,
      freezeTableName: true,
      paranoid: true
    }
  );
  mannerScore.associate = function(db) {
    mannerScore.belongsTo(db.user, {
      as: 'evaluator',
      foreignKey: 'evaluatorId'
    });
    mannerScore.belongsTo(db.user, { as: 'getScore', foreignKey: 'receiverId' });
  };
  return mannerScore;
};
