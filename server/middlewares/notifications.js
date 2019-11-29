const axios = require('axios');

const sendPushNotificationByAxios = async (pushToken, message) => {
  await axios
    .post(
      'https://exp.host/--/api/v2/push/send',
      {
        to: pushToken,
        sound: 'default',
        title: 'Vroom',
        body: message
      },
      {
        headers: {
          accept: 'application/json',
          'accept-encoding': 'gzip, deflate',
          'content-type': 'application/json'
        }
      }
    )
    .catch(err => {
      throw err;
    });
};
module.exports = {
  sendPushNotificationByAxios
};
