/**
 * HoldingsSchema - Defines the structure of a long-term stock holding.
 * Holdings represent stocks that the user has purchased and is holding for the long term.
 *
 * Fields:
 * - name: The stock ticker/symbol (e.g., "INFY", "TCS")
 * - qty: Number of shares currently owned
 * - avg: The average buy price per share (weighted average across all buy orders)
 * - price: The current market price of the stock (updated on each order)
 * - net: Overall net P&L percentage since first buy (e.g., "+5.03%")
 * - day: The day's change percentage (e.g., "-0.25%")
 */
const { Schema } = require("mongoose");

const HoldingsSchema = new Schema({
  name: String,  // Stock ticker symbol
  qty: Number,   // Total quantity held
  avg: Number,   // Average purchase price per share
  price: Number, // Latest market price
  net: String,   // Total net return % since first purchase
  day: String,   // Today's price change %
});

module.exports = { HoldingsSchema };