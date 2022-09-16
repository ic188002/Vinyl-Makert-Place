const mongoose = require('mongoose');


// Schema
const cartSchema = mongoose.Schema({
    record: [{
        title: String,
        artist: String,
        description: String,
        condition: String,
        releaseDate: String,
        askingPrice: Number,
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        albumCover: {
            type: String
        }
    
    }],
    totalPrice: Number,

},{timestamps: true});

const Cart = mongoose.model("Cart", cartSchema);


module.exports = {Cart};