const db = require('../../database/models');
const Op = db.Sequelize.Op;

const createChatAsAdmin = async orderId => {
  await db.chat
    .create({
      orderId,
      userId: 1,
      chatDetail: '채팅방이 생성되었습니다.'
    })
    .catch(err => console.error(err));
};

const readUserAllChatsByUserId = async userId => {
  console.log('userId', userId);
  return await db.order
    .findAll({
      where: { [Op.or]: { hostId: userId, deliverId: userId } },
      include: [
        {
          model: db.user,
          as: 'hostInfo',
          attributes: ['nickname', 'sex', 'age', 'campus', 'major', 'introduction', 'image']
        },
        {
          model: db.user,
          as: 'deliverInfo',
          attributes: ['nickname', 'sex', 'age', 'campus', 'major', 'introduction', 'image']
        },
        { model: db.chat /* attributes: ['chatId'] */ }
      ]
    })
    .catch(err => console.error(err));
};
module.exports = {
  createChatAsAdmin,
  readUserAllChatsByUserId
};