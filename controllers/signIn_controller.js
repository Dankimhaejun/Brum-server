const main = async (req, res, next) => {
  try {
    return res.json({ message: 'welcome' });
  } catch (e) {
    next(e);
  }
};
module.exports = {
  main
};
