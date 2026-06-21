/**
 * PositionsSchema - Defines the structure of an active/intraday trading position.
 * Unlike Holdings (long-term), Positions track live, open trades.
 * A position is created when a user buys, and removed/reduced when they sell.
 *
 * Fields:
 * - product: Trade type, typically "CNC" (Cash and Carry / delivery) or "MIS" (Intraday)
 * - name: The stock ticker symbol (e.g., "EVEREADY")
 * - qty: Number of shares in the position (negative means short-sold)
 * - avg: The average buy price per share for this position
 * - price: Current market price of the stock
 * - net: Total net P&L percentage for this position
 * - day: Today's change percentage for this position
 * - isLoss: Boolean flag - true if the position is currently at a loss
 */
const { Schema } = require("mongoose");

const PositionsSchema = new Schema({
    product: String,  // Trade product type: "CNC" or "MIS"
    name: String,     // Stock ticker symbol
    qty: Number,      // Quantity held (negative = short position)
    avg: Number,      // Average buy price
    price: Number,    // Current market price
    net: String,      // Net return % for this position
    day: String,      // Today's change %
    isLoss: Boolean,  // True if currently in loss
});

module.exports = { PositionsSchema };