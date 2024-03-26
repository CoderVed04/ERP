const mongoose = require('mongoose');

const moldingSchema = new mongoose.Schema({
    orderid: {
        type: String,
        required: true
    },
    mname: {
        type: String,
        required: true
    },
    gquantity: {
        type: Number,
        required: true
    },
    tquantity:{
        type: Number
    },
    cost: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    totalCost: {
        type: Number,
        required: true
    },
    wastage: {
        type: Number,
        required: true
    }
});

const moldDB = mongoose.model('Mold',moldingSchema);
module.exports = moldDB;