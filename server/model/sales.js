const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
    orderid: {
        type: String,
        required: true
    },
    wsname:{
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
    },
    date: {
        type: String,
        required: true
    },
    totalprice:{
        type: Number
    }
})

const salesDB = mongoose.model('Sales', saleSchema);
module.exports = salesDB;