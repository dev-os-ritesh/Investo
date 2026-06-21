/**
 * HoldingsModel
 * Mongoose Model for the "holding" collection in MongoDB.
 * This model is created by combining the HoldingsSchema with Mongoose's model() factory.
 * Use this model in route handlers to query/update the holdings collection:
 *   - HoldingsModel.find({}) -> get all holdings
 *   - HoldingsModel.findOne({ name }) -> find a specific stock
 *   - new HoldingsModel({...}).save() -> add a new holding
 *   - HoldingsModel.deleteOne({ name }) -> remove a holding after selling all shares
 */
const { model } = require("mongoose");

const { HoldingsSchema } = require("../schemas/HoldingsSchema");

// The first argument "holding" becomes the MongoDB collection name (pluralized to "holdings")
const HoldingsModel = model("holding", HoldingsSchema);

module.exports = { HoldingsModel };