const { userExpenseRegistration } = require("../../controller/userController");
const { validateExpense } = require("../../Middleware/userMiddleware")

const Router = require("express").Router();

Router.post("/expense", validateExpense, userExpenseRegistration);

module.exports = Router;