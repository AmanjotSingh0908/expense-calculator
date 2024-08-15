const {createUserExpense} = require("../repository/userRepository");
const {UserByIdandPassword} = require("../repository/userRepository")
const hardcodedOTP = '123456'

const userExpenseService = async (expenseData) => {
    const { userId, password, amount, expenditure } = expenseData;
    console.log(expenseData)
    try {
        const userExpense = await createUserExpense(userId, password, amount, expenditure);
        console.log(userExpense)
        return {
            message: 'Expense saved successfully', data: userExpense
        }
    } catch (error) {
        console.log(error)
        throw new Error('userExpenseService: Error saving expense');
    }
}

const getUser = async (userId, password, otp) => {
    try {
        if (otp !== hardcodedOTP) {
            const error = new Error('Invalid OTP');
            error.statusCode = 400;
            throw error;
        }

        const expenditures = await UserByIdandPassword(userId, password);
        if (!expenditures) {
            const error = new Error('getUser: User not found or incorrect password');
            error.statusCode = 404;
            throw error;
        }

        const expenditureDetails = expenditures.map(expenditure => ({
            amount: expenditure.amount,
            expenditureType: expenditure.expenditureType
        }));

        return { expenditureDetails };
    } catch (error) {
        throw error; // Re-throw the error to be caught by the controller
    }
}



module.exports = {
    userExpenseService,
    getUser
};