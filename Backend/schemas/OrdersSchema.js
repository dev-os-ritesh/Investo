/**
 * OrdersSchema - Defines the structure of a single trade order (history record).
 * Every time a user places a BUY or SELL order, one document is saved here.
 * This serves as the permanent audit trail / order history.
 *
 * Fields:
 * - name: The stock ticker symbol being traded (e.g., "INFY")
 * - qty: Number of shares in the order
 * - price: The price per share at which the order was placed
 * - mode: Whether it was a "BUY" or "SELL" order
 */
const { Schema } = require("mongoose");

const OrdersSchema = new Schema({
  name: String,  // Stock ticker symbol
  qty: Number,   // Quantity of shares traded
  price: Number, // Price per share at order time
  mode: String,  // Trade direction: "BUY" or "SELL"
});

module.exports = { OrdersSchema };