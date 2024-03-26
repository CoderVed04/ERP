const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
    orderid: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    sellername: {
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
    },
    date: {
        type: String,
        required: true
    },
    totalcost: {
        type: Number
    }
})

const purchaseDB = mongoose.model('Purchase', purchaseSchema);
module.exports = purchaseDB;