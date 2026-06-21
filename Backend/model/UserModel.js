/**
 * UserModel
 * Mongoose Model for the "user" collection in MongoDB.
 * This model is used by the authentication routes (/signup, /login) and
 * the user profile/margin routes (/user, /user/update-margin, etc.)
 * to read and write user account data.
 */
const { model } = require("mongoose");
const { UserSchema } = require("../schemas/UserSchema");

// The first argument "user" becomes the MongoDB collection name (pluralized to "users")
const UserModel = model("user", UserSchema);

module.exports = { UserModel };

