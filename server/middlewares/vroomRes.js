const vroomRes = (isSuccess, token, error, data) => {
  return {
    isSuccess: isSuccess,
    token: token,
    error: error,
    data: data
  };
};

module.exports = {
  vroomRes
};
