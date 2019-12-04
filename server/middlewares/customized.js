const db = require('../../database/models');
const Op = db.Sequelize.Op;

const vroomRes = (isSuccess, token, comment, data) => {
  return {
    isSuccess: isSuccess,
    token: token,
    comment: comment,
    data: data
  };
};

const updateOrderStatusEveryHour = () => {
  const updateOrderStatus = async () => {
    console.log('한시간마다 24시간동안 orderStatus가 0인 데이터를 77(응답없음) 으로 변경합니다');
    return await db.order.update(
      { orderStatus: 77 },
      {
        where: {
          orderStatus: 0,
          createdAt: {
            [Op.lt]: new Date(Date.now() - 1000 * 60 * 60 * 24)
          }
        }
      }
    );
  };
  return setInterval(updateOrderStatus, 1000 * 60 * 60);
};

module.exports = {
  vroomRes,
  updateOrderStatusEveryHour
};
