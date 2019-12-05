const db = require('../../database/models');
const Op = db.Sequelize.Op;

const createChatAsAdmin = async orderId => {
  await db.chat
    .create({
      orderId,
      userId: 1,
      chatDetail: '채팅방이 생성되었습니다.'
    })
    .catch(err => {
      console.error(err);
      throw err;
    });
};

const readUserAllChatsByUserIdStatus = async userId => {
  console.log('userId', userId);
  return await db.order
    .findAll({
      order: [['orderId', 'DESC']],
      where: {
        // [Op.not]: { orderStatus: 0 },
        orderStatus: { [Op.between]: [1, 4] },
        [Op.or]: { hostId: userId, deliverId: userId }
      },
      include: [
        {
          model: db.user,
          as: 'hostInfo',
          attributes: ['nickname', 'phone', 'sex', 'age', 'campus', 'major', 'introduction', 'image', 'isAuthed']
        },
        {
          model: db.user,
          as: 'deliverInfo',
          attributes: ['nickname', 'phone', 'sex', 'age', 'campus', 'major', 'introduction', 'image', 'isAuthed']
        },
        { model: db.chat }
      ]
    })
    .catch(err => {
      console.error(err);
      throw err;
    });
};

const readOneChatDetailByOrderId = async orderId => {
  return await db.order
    .findOne({
      where: { orderId },
      include: [
        {
          model: db.user,
          as: 'hostInfo',
          attributes: [
            'userId',
            'phone',
            'nickname',
            'sex',
            'age',
            'campus',
            'major',
            'introduction',
            'image',
            'isAuthed'
          ]
        },
        {
          model: db.user,
          as: 'deliverInfo',
          attributes: [
            'userId',
            'phone',
            'nickname',
            'sex',
            'age',
            'campus',
            'major',
            'introduction',
            'image',
            'isAuthed'
          ]
        },
        { model: db.chat }
      ]
    })
    .catch(err => {
      console.error(err);
      throw err;
    });
};

module.exports = {
  createChatAsAdmin,
  readUserAllChatsByUserIdStatus,
  readOneChatDetailByOrderId
};
