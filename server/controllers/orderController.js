import { vroomRes } from '../middlewares/vroomRes';
import { createOrder, readAllOrders, readAllOrdersByCampus, readOneOrder } from '../models/orderModel';
import { createOrderImages } from '../models/orderImageModel';
import { createOrderApply, readUserApplyOrNot, updateOrderApply, deleteMyOrderApply } from '../models/applicantModel';

const getOrders = async (req, res, next) => {
  try {
    const getAllOrders = await readAllOrders();
    res.json(
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
    await next(e);
  }
};

const getAllOrdersByCampus = async (req, res, next) => {
  try {
    const campus = req.params.campus;
    const getOrdersByCampus = await readAllOrdersByCampus(campus);
    res.json(
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
    await next(e);
  }
};

const getIdOrder = async (req, res, next) => {
  try {
    const userId = req.decoded.id;
    const orderId = req.params.orderId;
    const getOrder = await readOneOrder(orderId);
    res.json(
      vroomRes(
        true,
        true,
        'orderId의 주문 정보를 제공합니다. 1. userId는 필요시 사용하세요.(내 요청은 다르게 표현하고 싶을때, hostId를 비교하세요) 2.applicants에 현재 지원한 지원자들의 userId가 나옵니다. 3. 만약 applicants의 유저아이디에 내 아이디가 있다면, 이미 지원한 상태라고 생각하면 됩니다. 4. 지원을 하지 않았다면 화면에 [지원하기] 버튼이 필요합니다. 5. 유저가 이미 지원한 상태라면 [내 지원 수정하기], [내 지원 취소하기] 버튼이 있으면 좋을 것 같습니다.',
        { userId: userId, order: getOrder }
      )
    );
  } catch (e) {
    console.error(e);
    await next(e);
  }
};

const postOrder = async (req, res, next) => {
  try {
    const hostId = req.decoded.id;
    const campus = req.decoded.campus;
    const body = req.body;
    const filesArray = req.files;
    console.log('body', body), console.log('req.files', req.files);
    body.hostId = hostId;
    body.campus = campus;
    const newOrder = await createOrder(body);
    const orderId = newOrder.dataValues.orderId;
    if (filesArray.length) {
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
  } catch (e) {
    console.error(e);
    await next(e);
  }
};

const postOrderApply = async (req, res, next) => {
  try {
    const userId = req.decoded.id;
    const orderId = req.params.orderId;
    const { bidPrice, applyComment } = req.body;
    const checkApply = await readUserApplyOrNot(orderId, userId);
    if (checkApply === null) {
      const postApply = await createOrderApply(orderId, userId, bidPrice, applyComment);
      res.json(
        vroomRes(
          true,
          true,
          '1. 유저가 주문에 지원하기를 눌렀습니다. 아래는 지원한 유저의 정보입니다. 2. 유저의 지원이 완료되면 유저의 정보를 바탕으로 /order/:orderId 를 다시 랜더링해주시면 됩니다! 3. 유저가 지원목록에 추가가 되어있기 때문에 [내 지원 수정하기], [내 지원 삭제하기] 버튼을 활성화 시켜놓은 페이지가 됩니다.',
          { applicantInfo: postApply }
        )
      );
    } else {
      res.json(vroomRes(false, true, '이미 지원한 유저입니다. 다시 확인해주세요', null));
    }
  } catch (e) {
    console.error(e);
    await next(e);
  }
};

const putOrderApply = async (req, res, next) => {
  try {
    const userId = req.decoded.id;
    const orderId = req.params.orderId;
    const { bidPrice, applyComment } = req.body;
    const updateApply = await updateOrderApply(orderId, userId, bidPrice, applyComment);
    console.log('updateApply', updateApply);
    return res.json(
      vroomRes(
        true,
        true,
        '업데이트가 완료되었습니다. 내가 지원한 내역으로 돌아가 금액과 커맨트가 수정되었는지 확인해야되는데..내가 지원한 현황은 볼 수 있는 방법을 찾아봅시다',
        updateApply
      )
    );
  } catch (e) {
    console.error(e);
    await next(e);
  }
};

const deleteOrderApply = async (req, res, next) => {
  try {
    const userId = req.decoded.id;
    const orderId = req.params.orderId;
    const deleteApply = await deleteMyOrderApply(orderId, userId);
    console.log('deleteApply', deleteApply);
    res.json(
      vroomRes(
        true,
        true,
        '1.내가 작성한 요청이 삭제되었습니다. 2. 다시 [GET] /order/:orderId로 화면을 전환해주세요. 3. 전환했을때 다시 [지원하기] 버튼이 활성화 된다면 성공!',
        deleteApply
      )
    );
  } catch (e) {
    console.error(e);
    await next(e);
  }
};

module.exports = {
  getOrders,
  getIdOrder,
  getAllOrdersByCampus,
  postOrder,
  postOrderApply,
  putOrderApply,
  deleteOrderApply
};
