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

const UserByIdandPassword = async (userId, password) => {
  try {
      const user = await userExpenseSchema.findOne({ userId, password }, { expenditures: 1, _id: 0 }).lean();
      return user ? user.expenditures : null;
  } catch (error) {
      const repoError = new Error('Database error occurred');
      repoError.statusCode = 500;
      throw repoError; // Re-throw the error to be caught by the service
  }
};


module.exports = {
  createUserExpense,
  UserByIdandPassword
};
