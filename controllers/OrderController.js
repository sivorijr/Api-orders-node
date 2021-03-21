const mongoose = require("mongoose");
const axios = require("axios");
const Order = require("../models/Order");

class OrderController {
    async getAll(req, res) {
        try {
            const orders = await Order.find();
            const ordersDetails = orders.map(order => {
                return new Promise(async (resolve, reject) => {
                    const customer = await axios.get(process.env.API_CUSTOMER_URL + "/customer/" + order.customerID)
                    const book = await axios.get(process.env.API_BOOK_URL + "/book/" + order.bookID)

                    resolve({
                        "_id": order._id,
                        "customer": customer.data,
                        "book": book.data,
                        "deliveryDate": order.deliveryDate,
                        "createdAt": order.createdAt,
                        "updatedAt": order.updatedAt,
                        "_v": order._v
                    })
                });
            })

            return Promise.all(ordersDetails).then(results => res.json(results))
        } catch (err) {
            console.log(err);
            res.status(500).send(err);
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

                // await axios.get(process.env.API_CUSTOMER_URL + "/customer/" + res.customerID)
                await axios.get(process.env.API_CUSTOMER_URL + "/health")
                .then(response => {
                    answer.customerID = response.data;
                })
                .catch(err => {
                    throw err;
                });
        
                // await axios.get(process.env.API_BOOK_URL + "/book/" + res.bookID)
                await axios.get(process.env.API_BOOK_URL + "/health")
                .then(response => {
                    answer.bookID = response.data;
                })
                .catch(err => {
                    throw err;
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