/**
 * PositionsModel
 * Mongoose Model for the "position" collection in MongoDB.
 * Unlike Orders (which are permanent history), positions are dynamic:
 * - A position is CREATED when a stock is bought for the first time.
 * - A position is UPDATED (quantity/avg changed) on subsequent buys or partial sells.
 * - A position is DELETED when all shares are sold (qty reaches 0).
 * This gives a real-time snapshot of what the user currently owns.
 */
const { model } = require("mongoose");
const { PositionsSchema } = require("../schemas/PositionsSchema");

// The first argument "position" becomes the MongoDB collection name (pluralized to "positions")
const PositionsModel = model("position", PositionsSchema);

module.exports = { PositionsModel };

