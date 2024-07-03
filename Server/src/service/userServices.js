const userExpenseRepository = require("../repository/userRepository");

const userExpenseService = async (userExpense) => {


    const saveUserExpense = await userExpenseRepository.addUserExpense(userExpense);
    return saveUserExpense;
}

module.exports = {
    userExpenseService
};