import { vroomRes } from '../middlewares/vroomRes';
import { createOrder } from '../models/orderModel/create';
import { readAllOrders, readAllOrdersByCampus, readOneOrder } from '../models/orderModel/read';
import { createOrderImages } from '../models/orderImageModel';
import { uploadOrderImages } from '../middlewares/s3';

const getOrders = async (req, res) => {
  try {
    const getAllOrders = await readAllOrders();
    return res.json(
      vroomRes(
        true,
        true,
        '전체 주문 내역을 배열형태로 제공합니다. hostInfo는 주문한 사람의 정보를 나타내고, applicants안에 있는 배열은 현재 지원자의 수를 나타냅니다. (카운트 함수를 사용하니 평균 구할때와 같은 오류가 발생하여 배열로 보내드리니, length로 지원자 현황 파악해주시면 감사하겠습니다!)',
        {
          orders: getAllOrders
        }
      )
    );
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const getAllOrdersByCampus = async (req, res) => {
  try {
    const campus = req.params.campus;
    const getOrdersByCampus = await readAllOrdersByCampus(campus);
    return res.json(
      vroomRes(
        true,
        true,
        '캠퍼스와 일치한 전체 주문 내역을 배열형태로 제공합니다. hostInfo는 주문한 사람의 정보를 나타내고, applicants안에 있는 배열은 현재 지원자의 수를 나타냅니다. (카운트 함수를 사용하니 평균 구할때와 같은 오류가 발생하여 배열로 보내드리니, length로 지원자 현황 파악해주시면 감사하겠습니다!)',
        {
          orders: getOrdersByCampus
        }
      )
    );
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const getIdOrder = async (req, res) => {
  try {
    const userId = req.decoded.id;
    const orderId = req.params.orderId;
    const getOrder = await readOneOrder(orderId);
    return res.json(
      vroomRes(
        true,
        true,
        'orderId의 주문 정보를 제공합니다. 1. userId는 필요시 사용하세요.(내 요청은 다르게 표현하고 싶을때, hostId를 비교하세요) 2.applicants에 현재 지원한 지원자들의 userId가 나옵니다. 3. 만약 applicants의 유저아이디에 내 아이디가 있다면, 이미 지원한 상태라고 생각하면 됩니다. 4. 지원을 하지 않았다면 화면에 [지원하기] 버튼이 필요합니다. 5. 유저가 이미 지원한 상태라면 [내 지원 수정하기], [내 지원 취소하기] 버튼이 있으면 좋을 것 같습니다.',
        { userId: userId, order: getOrder }
      )
    );
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const postOrder = async (req, res) => {
  try {
    const uploadImage = uploadOrderImages.fields([{ name: 'thumbnail' }, { name: 'file' }]);
    await uploadImage(req, res, async function(err) {
      if (err) {
        console.error(err);
      }
      const hostId = req.decoded.id;
      const campus = req.decoded.campus;
      const body = req.body.formData;
      const filesArray = req.files.file;
      body.thumbnailURL = req.files.thumbnail[0].location;
      body.hostId = hostId;
      body.campus = campus;
      const newOrder = await createOrder(body);
      const orderId = newOrder.dataValues.orderId;
      if (filesArray) {
        await createOrderImages(filesArray, orderId);
      }
      return res.json(
        vroomRes(
          true,
          true,
          '새로운 주문이 추가되었습니다. 주문 정보는 아래와 같습니다. 주문의 orderId를 참고해서 [GET] /user/order/:orderId로 새로 작성한 주문을 바로 볼수 있게 작성해주세요',
          {
            order: newOrder
          }
        )
      );
    });
  } catch (e) {
    console.error(e);
    throw e;
  }
};

module.exports = {
  getOrders,
  getIdOrder,
  getAllOrdersByCampus,
  postOrder
};
