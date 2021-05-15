const mongoose = require('mongoose');

const personSchema = mongoose.Schema({
    name: String,
    base: {
        totalAmount: Number,
        remainingAmount: Number,
        months: Number
    },
    detail: [{
        amount: Number,
        title: String,
        month: String
    }],
    isDeleted: Boolean,
}, {
    timestamps: true
});

module.exports = mongoose.model('personBook', personSchema);