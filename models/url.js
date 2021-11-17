const mongoose = require("mongoose");
const shortUrlId = require("shortid");
// shortUrlId.generate();

const urlSchema = new mongoose.Schema({
    longURL: {
        type: String,
        required: true
    },
    shortURL: {
        type: String,
        required: true,
    },
    shortUrlId: {
        type: String,
        required: true,
        unique: true
    }
});
module.exports = mongoose.model("url", urlSchema);