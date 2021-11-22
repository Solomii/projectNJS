const mongoose = require("mongoose");
// const shortUrlId = require("shortid");
// shortUrlId.generate();

const urlSchema = new mongoose.Schema({
    // longURL: {
    //     type: String,
    //     required: true
    // },
    // shortURL: {
    //     type: String,
    //     required: true,
    //     default: shortUrlId.generate
    // },
    // clicks: {
    //     type: Number,
    //     required: true,
    //     default:0
    // }
    urlCode: String,
    longUrl: String,
    shortUrl: String,
    date: {
        type: String,
        default: Date.now
    }

});
module.exports = mongoose.model("Url", urlSchema);