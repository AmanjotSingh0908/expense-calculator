const {userExpenseService} = require("../service/userServices");
const {getUser} = require("../service/userServices");

const userExpenseRegistration = async (req,res) => {
    try {
        const response = await userExpenseService(req.body);
        res.send(response);
    } catch (error) {
        console.log(error)
        res.status(400).send({
            msg: "BAD REQUEST",
        });
    }
}

const getUsers = async (req, res) => {
    const { userId } = req.params;
    const { password, otp } = req.query;

    try {
        const user = await getUser(userId, password, otp);
        return res.status(200).json(user);
    } catch (error) {
        const statusCode = error.statusCode || 500; // Default to 500 if statusCode is not set
        return res.status(statusCode).json({ error: error.message });
    }
}


module.exports = {
    userExpenseRegistration,
    getUsers
} 