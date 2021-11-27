const express = require('express');
const router = express.Router();
require('dotenv').config({ path: '../.env' });
const { createNewShortUrl, deleteUrl, redirectToSite } = require('../service/handlers');

router.get('/:urlCode', (req, res) => {
  redirectToSite(req, res);
})

router.post('/shorten',  (req, res) => {
  createNewShortUrl(req, res);
})

router.get("/delete/:urlCode", (req, res) => {
  deleteUrl(req, res);
});

module.exports = router;