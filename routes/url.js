const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const shortId = require('shortid');
require('dotenv').config({ path: '../.env' });
const {createNewShortUrl, deleteUrl} = require('../service/handlers')
const Url = require("../models/url")

router.post('/shorten',  (req, res) => {
  createNewShortUrl(req, res);
})

router.get("/delete/:urlCode", (req, res) => {
  deleteUrl(req, res);
});

module.exports = router;