/**
 * OrdersModel
 * Mongoose Model for the "order" collection in MongoDB.
 * Each document in this collection represents a single trade order (BUY or SELL).
 * This is the order history/ledger - records are only ever added, never deleted.
 * The route handler for POST /newOrder creates a new OrdersModel document on each trade.
 */
const { model } = require("mongoose");

const { OrdersSchema } = require("../schemas/OrdersSchema");

// The first argument "order" becomes the MongoDB collection name (pluralized to "orders")
const OrdersModel =  model("order", OrdersSchema);

module.exports = { OrdersModel };