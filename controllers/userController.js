import { vroomRes } from '../middlewares/vroomRes';
import { getUserInfo } from '../models/userModel';

const getMyInfo = async (req, res, next) => {
  try {
    const { id } = req.decoded;
    const userInfo = await getUserInfo(id);
    const { phone, name, sex, age, university, major, introduction, photo } = userInfo.dataValues;
    res.json(
      vroomRes(true, true, null, {
        phone,
        name,
        sex,
        age,
        university,
        major,
        introduction,
        photo
      })
    );
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getMyInfo
};
