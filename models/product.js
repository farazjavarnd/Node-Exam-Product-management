const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true,
    },
    quantity: {
        type: String,
        required: true,
    },
    vendor: {
        type: String,
        required: true,
    },
    warranty: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('product', schema);