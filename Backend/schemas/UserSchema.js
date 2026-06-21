/**
 * UserSchema - Defines the structure of a user account in the system.
 * Stores user credentials and their financial account state (funds, apps).
 *
 * Fields:
 * - name: User's display name (optional on signup)
 * - email: Unique email address used for login (serves as the primary key)
 * - phone: User's phone number (optional)
 * - password: User's password - NOTE: stored as plain text, should be hashed in production
 * - availableMargin: The funds currently available for trading (cash not tied up in positions)
 * - usedMargin: The funds currently locked in active positions/orders
 * - openingBalance: Total balance at account open or after the last fund deposit
 * - commodityRequested: Whether the user has requested access to commodity trading
 * - activeApps: List of app names the user has installed from the App Directory
 */
const { Schema } = require("mongoose");

const UserSchema = new Schema({
  name: { type: String, required: false },
  email: { type: String, required: true, unique: true }, // Primary identifier; must be unique
  phone: { type: String, required: false },
  password: { type: String, required: true }, // TODO: Hash this with bcrypt before storing
  availableMargin: { type: Number, default: 4043.10 },   // Free cash for new trades
  usedMargin: { type: Number, default: 3757.30 },        // Cash locked in open positions
  openingBalance: { type: Number, default: 4043.10 },    // Total deposited balance
  commodityRequested: { type: Boolean, default: false }, // Has user requested commodity access?
  activeApps: { type: [String], default: [] }            // Array of installed app names
});

module.exports = { UserSchema };

