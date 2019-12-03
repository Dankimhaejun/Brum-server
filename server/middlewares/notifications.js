const axios = require('axios');

const sendPushNotificationByAxios = (pushToken, title, message) => {
  return axios
    .post(
      'https://exp.host/--/api/v2/push/send',
      {
        to: pushToken,
        sound: 'default',
        title: title,
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
      console.error(err);
      throw err;
    });
};

module.exports = {
  sendPushNotificationByAxios
};
