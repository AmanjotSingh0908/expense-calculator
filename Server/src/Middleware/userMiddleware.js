const validateExpense = (req, res, next) => {
  const { userId, password } = req.body;
  console.log(userId, password)
  if (userId && password) {
    return next();
  }

  return res.status(401).send({
    msg: "Invalid credentials",
  });
};

const validateUser = (req, res, next) => {
  if(req.method == 'GET'){
    return next();
  }

  return res.status(401).send({
    msg: "GET method not received"
  })
}

module.exports = {
  validateExpense,
  validateUser
};
