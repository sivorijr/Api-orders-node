const mongoose = require("mongoose");

const Order = new mongoose.Schema({
    customerID: {
        type: mongoose.SchemaTypes.ObjectId,
        require: true,
    },

    bookID: {
        type: mongoose.SchemaTypes.ObjectId,
        require: true
    },
    
    deliveryDate: {
        type: Date,
        require: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Order", Order);