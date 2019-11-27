const ChatKit = require('@pusher/chatkit-server');
const PushNotifications = require('@pusher/push-notifications-server');

const chatKit = new ChatKit.default({
  instanceLocator: 'v1:us1:71445c87-ac46-4e59-a48f-abef5fd8e26a',
  key: 'dfa003bc-4799-4da0-a82e-a7079c6d0b34:kQX+NT8AwT57k3In2RzAFn+SeZPZvNyKYR6ZamgZk6M='
});

let pusher = new PushNotifications({
  instanceId: '2379c4b7-6b92-4749-a586-80f6a0c66d5b',
  secretKey: '35B99805E52F4ED809AE255412FFECDDC3815EE33E862D27DED360630C4E83BF'
});
module.exports = {
  chatKit
};
