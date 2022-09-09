const mongoose = require('mongoose');

// Schema
const paymentSchema = mongoose.Schema({
    billingAddress: {
        streetName: {
           type: String,
           required: true,
           minlenght: [6, 'need to be longer'],
       },
       townCity : {
           type : String,
           required: true,
       },
       houseNumber : {
           type : Number,
           required: true,
       },
       postcode : {
           type : String,
           required: true,
       },

    user: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]

}, 

});


const Payment = mongoose.models("Payment", paymentsSchema);


module.exports = {Payment};