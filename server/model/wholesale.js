const mongoose = require('mongoose');

const wsSchema = new mongoose.Schema({
    orderid: {
        type: String,
        required: true
    },
    wname: {
        type: String,
        required: true
    },
    date: {
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
});

const wsDB = mongoose.model('Wholesaler',wsSchema);
module.exports = wsDB;