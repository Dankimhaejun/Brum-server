import { vroomRes } from '../middlewares/vroomRes';
import { readUserAllChatsByUserId } from '../models/chatModel';

const getAllChatsByUserId = async (req, res, next) => {
  try {
    const userId = req.decoded.id;
    const userChatInfo = await readUserAllChatsByUserId(userId);
    console.log('userChatInfo', userChatInfo);
    res.json(vroomRes(true, true, '유저가 속해있는 order의 모든 채팅 정보를 제공합니다', userChatInfo));
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAllChatsByUserId
};
