const userExpenseSchema = require("../models/userSchemas/userSchema");

const createUserExpense = async (userId, password, amount, expenditure) => {
  try {
    let userExpense = await userExpenseSchema.findOne({userId, password});

    if (!userExpense) {
      userExpense = new userExpenseSchema({
        userId,
        password,
        expenditures: [{ amount, expenditureType: expenditure }],
      });
    } else {
      userExpense.expenditures.push({ amount, expenditureType: expenditure });
    }
  
    await userExpense.save();
    return userExpense;
  } catch (error) {
    console.log(error)
    throw new Error('createUserExpense: Error in repo');
  }
};

const UserByIdandPassword = async(userId, password) => {
  const user = await userExpenseSchema.findOne({userId, password}, {expenditures:1, _id:0}).lean();
  return user ? user.expenditures : null;
};

module.exports = {
  createUserExpense,
  UserByIdandPassword
};
