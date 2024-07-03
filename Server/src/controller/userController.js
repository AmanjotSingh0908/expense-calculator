const userExpenseService = require("../service/userServices");

const userExpenseRegistration = async (req,res) => {
    try {
        const response = await userExpenseService(req.body);
        res.send(response);
    } catch (error) {
        res.status(400).send({
            msg: "BAD REQUEST"
        });
    }
}

module.exports = {
    userExpenseRegistration
}