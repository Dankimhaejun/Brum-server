const vroomRes = (isSuccess, isToken, error, data) => {
  return {
    isSuccess: isSuccess,
    isToken: isToken,
    error: error,
    data: data
  };
};

module.exports = {
  vroomRes
};
