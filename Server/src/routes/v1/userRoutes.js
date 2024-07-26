const { userExpenseRegistration, getUsers } = require("../../controller/userController");
const { validateExpense } = require("../../Middleware/userMiddleware")
const { validateUser } = require("../../Middleware/userMiddleware")

const Router = require("express").Router();

Router.post("/expense", validateExpense, userExpenseRegistration);
Router.get('/expense/:userId', validateUser, getUsers);

module.exports = Router; 