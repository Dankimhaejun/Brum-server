const db = require('./index');

module.exports = function(sequelize, Datatypes) {
  const review = sequelize.define(
    'review',
    {
      reviewId: {
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
      userReview: {
        type: Datatypes.STRING
      }
    },
    {
      underscored: false,
      freezeTableName: true
    }
  );
  review.associate = function(db) {
    review.belongsTo(db.user, {
      as: 'evaluator',
      foreignKey: 'evaluatorId'
    });
    review.belongsTo(db.user, { as: 'getScore', foreignKey: 'receiverId' });
    review.belongsTo(db.order, {
      foreignKey: 'orderId'
    });
  };
  return review;
};
