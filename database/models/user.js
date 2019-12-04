const db = require('./index');

module.exports = function(sequelize, Datatypes) {
  const user = sequelize.define(
    'user',
    {
      userId: {
        type: Datatypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      phone: {
        type: Datatypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Datatypes.STRING,
        allowNull: false
      },
      nickname: {
        type: Datatypes.STRING,
        allowNull: false
      },
      sex: {
        type: Datatypes.STRING,
        allowNull: false
      },
      name: {
        type: Datatypes.STRING
      },
      age: {
        type: Datatypes.STRING
      },
      campus: {
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
      university: {
        type: Datatypes.STRING,
        defaultValue: null
      },
      email: {
        type: Datatypes.STRING,
        defaultValue: null
      },
      isAuthed: {
        type: Datatypes.BOOLEAN,
        defaultValue: false
      },
      authCode: {
        type: Datatypes.STRING,
        defaultValue: null
      },
      pushToken: {
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
      freezeTableName: true,
      paranoid: true
    }
  );
  user.associate = function(db) {
    user.hasMany(db.applicant, { foreignKey: 'userId' });
    user.hasMany(db.order, { foreignKey: 'hostId' });
    user.hasMany(db.order, { foreignKey: 'deliverId' });
    user.hasMany(db.review, { as: 'evaluator', foreignKey: 'evaluatorId' });
    user.hasMany(db.review, { as: 'getScore', foreignKey: 'receiverId' });
    user.hasMany(db.chat, { foreignKey: 'userId' });
    user.hasMany(db.userLikeOrder, { foreignKey: 'userId' });
    user.hasMany(db.chatImage, { foreignKey: 'userId' });
  };
  return user;
};
