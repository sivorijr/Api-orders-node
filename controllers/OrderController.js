const mongoose = require("mongoose");
const axios = require("axios");
const Order = require("../models/Order");

class OrderController {
    async getAll(req, res) {
        const orders = await Order.find().populate({
            path: "data",
            options: { sort: { createdAt: -1 } }
        });

        orders.forEach((order, key) => {
            axios.get(process.env.API_CUSTOMER_URL + "/customer/" + order.customerID).then((response) => {
                orders[key].customerID = response.data;
            });
    
            axios.get(process.env.API_BOOK_URL + "/book/" + order.bookID).then((response) => {
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
        const order = await Order.findById(req.params.id).then(async (res) => {
            let answer = {
                "_id": res._id,
                "customerID": [],
                "bookID": [],
                "deliveryDate": res.deliveryDate,
                "createdAt": res.createdAt,
                "updatedAt": res.updatedAt,
                "__v": res.__v
            }

            await axios.get(process.env.API_CUSTOMER_URL + "/customer/" + res.customerID).then((response) => {
                answer.customerID = response.data;
            });
    
            await axios.get(process.env.API_BOOK_URL + "/book/" + res.bookID).then((response) => {
                answer.bookID = response.data;
            });

            return answer;
        });

        return res.json(order);
    }

    async delete(req, res) {
        await Order.findByIdAndDelete(req.params.id);

        return res.send("Order deleted with success");
    }
}

module.exports = new OrderController();