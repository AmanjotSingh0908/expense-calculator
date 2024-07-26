const mongoose = require("mongoose");

const userExpenseSchema = new mongoose.Schema({
    userId: { type: String, required:true },
    password: { type: String, required: true },
    expenditures: [{
        amount: { type: Number, required: true },
        expenditureType: { type: String, required: true },
    }]
})

module.exports = mongoose.model('UserExpense', userExpenseSchema);

