const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const shortId = require('shortid');
require('dotenv').config({ path: '../.env' });

const Url = require("../models/url")

router.post('/shorten', async (req, res) => {
  const { longUrl } = req.body;
  const baseUrl = process.env.BASE_URL;

  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json({ message: 'Invalid base url' });
  }

  const urlCode = shortId.generate();

   if (validUrl.isUri(longUrl)) {
    try {
      let url = await Url.findOne({ longUrl });

      if (url) {
        res.json(url);
      } else {
        const shortUrl = `${baseUrl}/${urlCode}`;

       url = new Url({
          longUrl:req.body.longUrl,
          shortUrl,
          urlCode,
          date: new Date()
        });

        await url.save();
        return res.redirect(baseUrl);
        res.json(url);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json('Server error');
    }
  } else {
    res.status(401).json('Invalid long url');
  } 
})

module.exports = router;