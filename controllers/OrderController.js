const mongoose = require("mongoose");
const axios = require("axios");
const Order = require("../models/Order");

class OrderController {
    async getAll(req, res) {
        try {
            const orders = await Order.find().populate({
                path: "data",
                options: { sort: { createdAt: -1 } }
            })

            let arr = [];

            for (var i = 0; i < orders.length; i++) {
                let answerOrder = {
                    "_id": orders[i]._id,
                    "customerID": [],
                    "bookID": [],
                    "deliveryDate": orders[i].deliveryDate,
                    "createdAt": orders[i].createdAt,
                    "updatedAt": orders[i].updatedAt,
                    "__v": orders[i].__v
                }
        
                await axios.get(process.env.API_CUSTOMER_URL + "/customer/" + orders[i].customerID)
                .then(response => {
                    answerOrder.customerID = response.data;
                })
                .catch(err => {
                    throw err;
                });
        
                await axios.get(process.env.API_BOOK_URL + "/book/" + orders[i].bookID)
                .then(response => {
                    answerOrder.bookID = response.data;
                })
                .catch(err => {
                    throw err;
                });
        
                arr.push(answerOrder);
            }

            return res.json(arr);
        } catch (err) {
            throw err;
        }
    }

    async set(req, res) {
        try {
            var newOrder = {
                customerID: mongoose.Types.ObjectId(req.body.customerID),
                bookID: mongoose.Types.ObjectId(req.body.bookID),
                deliveryDate: req.body.deliveryDate
            }

            const oreder = await Order.create(newOrder);

            return res.json(oreder);
        } catch (err) {
            throw err;
        }
    }

    async get(req, res) {
        try {
            const order = await Order.findById(req.params.id).then(async res => {
                let answer = {
                    "_id": res._id,
                    "customerID": [],
                    "bookID": [],
                    "deliveryDate": res.deliveryDate,
                    "createdAt": res.createdAt,
                    "updatedAt": res.updatedAt,
                    "__v": res.__v
                }

                await axios.get(process.env.API_CUSTOMER_URL + "/customer/" + res.customerID).then(response => {
                    answer.customerID = response.data;
                });
        
                await axios.get(process.env.API_BOOK_URL + "/book/" + res.bookID).then(response => {
                    answer.bookID = response.data;
                });

                return answer;
            });

            return res.json(order);
        } catch (err) {
            throw err;
        }
    }

    async delete(req, res) {
        try {
            await Order.findByIdAndDelete(req.params.id);

            return res.send("Order deleted with success");
        } catch (err) {
            throw err;
        }
    }
}

module.exports = new OrderController();