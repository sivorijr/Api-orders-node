const mongoose = require("mongoose");
const axios = require("axios");
const Order = require("../models/Order");

class OrderController {
    async getAll(req, res) {
        const orders = await Order.find().populate({
            path: "files",
            options: { sort: { createdAt: -1 } }
        });

        orders.forEach((order, key) => {
            axios.get(process.env.APP_URL + "/customer/" + order.customerID).then((response) => {
                orders[key].customerID = response.data;
            });
    
            axios.get(process.env.APP_URL + "/book/" + order.bookID).then((response) => {
                orders[key].bookID = response.data;
            });
        })

        return res.json(orders);
    }

    async set(req, res) {
        var newOrder = {
            customerID: mongoose.Types.ObjectId(req.body.customerID),
            bookID: mongoose.Types.ObjectId(req.body.bookID),
            deliveryDate: req.body.deliveryDate
        }

        const oreder = await Order.create(newOrder);

        return res.json(oreder);
    }

    async get(req, res) {
        const order = await Order.findById(req.params.id).populate({
            path: "files",
            options: { sort: { createdAt: -1 } }
        });

        axios.get(process.env.APP_URL + "/customer/" + order.customerID).then((response) => {
            order.customerID = response.data;
        });

        axios.get(process.env.APP_URL + "/book/" + order.bookID).then((response) => {
            order.bookID = response.data;
        });

        return res.json(order);
    }

    async delete(req, res) {
        await Order.findByIdAndDelete(req.params.id);

        return res.send("Customer deleted with success");
    }
}

module.exports = new OrderController();