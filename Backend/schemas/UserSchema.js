const { Schema } = require("mongoose");

const UserSchema = new Schema({
  name: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: false },
  password: { type: String, required: true },
  availableMargin: { type: Number, default: 4043.10 },
  usedMargin: { type: Number, default: 3757.30 },
  openingBalance: { type: Number, default: 4043.10 },
  commodityRequested: { type: Boolean, default: false },
  activeApps: { type: [String], default: [] }
});

module.exports = { UserSchema };
