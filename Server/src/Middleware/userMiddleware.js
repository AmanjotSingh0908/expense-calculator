const validateExpense = (req, res, next) => {
  const { userId, password } = req.body;
  if (userId && password) {
    return next();
  }

  return res.status(401).send({
    msg: "Invalid credentials",
  });
};

module.exports = {
    validateExpense
}