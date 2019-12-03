import { vroomRes } from '../middlewares/vroomRes';
import { readUserAllChatsByUserIdStatus, readOneChatDetailByOrderId } from '../models/chatModel';

const getAllChatsByUserId = async (req, res) => {
  try {
    const userId = req.decoded.id;
    const userChatInfo = await readUserAllChatsByUserIdStatus(userId);
    console.log('userChatInfo', userChatInfo);
    return res.json({
      isSuccess: true,
      token: true,
      comment: '유저가 속해있는 order의 모든 채팅 정보를 제공합니다',
      userId: userId,
      data: userChatInfo
    });
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const getChatDetailByOrderId = async (req, res) => {
  try {
    const userId = req.decoded.id;
    const orderId = Number(req.params.orderId);
    const getChatInfoByOrderId = await readOneChatDetailByOrderId(orderId);
    return res.json(
      vroomRes(
        true,
        true,
        '특정 orderId의 채팅정보를 제공합니다. 객체에 제공되는 userId는 현재 접속해있는 유저의 id입니다. 채팅에서 userId를 확인하여 나와 상대방을 구분해주세요',
        { userId, chatDetail: getChatInfoByOrderId }
      )
    );
  } catch (e) {
    console.error(e);
    throw e;
  }
};

module.exports = {
  getAllChatsByUserId,
  getChatDetailByOrderId
};
