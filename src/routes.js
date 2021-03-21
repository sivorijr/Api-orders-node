const express = require("express");

const routes = express.Router();

const OrderController = require("../controllers/OrderController");

routes.get("/", (req, res) => { return res.send("ORDERS API by Sivori Junior") });
routes.get("/health", (req, res) => { return res.send("OK") });

routes.get("/orders", OrderController.getAll);

routes.post("/order", OrderController.set);
routes.get("/order/:id", OrderController.get);
routes.delete("/order/:id", OrderController.delete);

module.exports = routes;