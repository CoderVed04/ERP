const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    orderid: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})

const adminDB = mongoose.model('Admin', adminSchema);
module.exports = adminDB;