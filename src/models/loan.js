const mongoose = require("mongoose");

const loanSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: "Pending"
    },
    total_amount: {
        type: Number,
        required: true,
    },
    num_installments: {
        type: Number,
        required: true
    },
});

const Loan = mongoose.model("temploan", loanSchema);
module.exports = Loan;
