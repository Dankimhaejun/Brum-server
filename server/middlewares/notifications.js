const axios = require('axios');

const sendPushNotification = async pushToken =>
  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: {
      to: pushToken,
      sound: 'default',
      title: 'Vroom',
      body: '메시지 간다 메시지 받아라'
    }
  }).catch(err => {
    throw err;
  });

const sendPushNotificationByAxios = async pushToken => {
  await axios
    .post(
      'https://exp.host/--/api/v2/push/send',
      {
        to: pushToken,
        sound: 'default',
        title: 'Vroom',
        body: '메시지간다 받아랏'
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
  sendPushNotification,
  sendPushNotificationByAxios
};
