const Url = require("../models/url");
const express = require('express');
const validUrl = require('valid-url');
const shortId = require('shortid');
require('dotenv').config({ path: '../.env' });

async function redirectToSite(req, res) {
    try {
    const url = await Url.findOne({ urlCode: req.params.urlCode });
    if (url) {
      url.clicks++;
      url.save();
      return res.redirect(url.longUrl)
    } else {
      return res.status(404).json({message: "no url found"})
    }
    
  } catch (error) {
    console.error(err);
    res.status(500).json({message: 'Server error'});
  }
};

async function createNewShortUrl(req, res) {
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
};
  
async function deleteUrl(req, res) {
    try {
    const url = await Url.findOne({ urlCode: req.params.urlCode });
    if (url == null) return res.sendStatus(404);
    url.remove();
    console.log(url);
    res.redirect("/");
  } catch (err) {
    next(err)
  }
};



module.exports = {
  createNewShortUrl,
  deleteUrl,
  redirectToSite
}