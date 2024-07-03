const userExpenseSchema = require("../models/userSchemas/userSchema");

const addUserExpense = async (userExpense) => {
  const response = await userExpenseSchema.create(userExpense);
  return response;
};

module.exports = {
  addUserExpense,
};
