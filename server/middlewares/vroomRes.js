const vroomRes = (isSuccess, token, comment, data) => {
  return {
    isSuccess: isSuccess,
    token: token,
    comment: comment,
    data: data
  };
};

module.exports = {
  vroomRes
};
