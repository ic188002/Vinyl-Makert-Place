const mongoose = require('mongoose');


// Schema
const cartSchema = mongoose.Schema({
    record: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Record'
    }],
    totalPrice: Number,

},{timestamps: true});

const Cart = mongoose.model("Cart", cartSchema);


module.exports = {Cart};