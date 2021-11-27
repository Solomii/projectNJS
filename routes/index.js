const express = require('express');
const router = express.Router();
const {redirectToSite} = require("../service/handlers")

const Url = require('../models/url');

router.get('/:urlCode', (req, res) => {
  redirectToSite(req, res);
})

module.exports = router;