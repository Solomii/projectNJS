const Url = require("../models/url");
const shortId = require('shortid');
require('dotenv').config({ path: '../.env' });
var validator = require('validator');

async function redirectToSite(req, res) {
    try {
    const url = await findOneUrlParams(req.params.urlCode);
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

  if (!validator.isURL(baseUrl)) {
    return res.status(401).json({ message: 'Invalid base url' });
  }

  const urlCode = shortId.generate();

   if (validator.isURL(longUrl)) {
    try {
      let url = await Url.findOne({ longUrl });

      if (url) {
        res.json(url);
      } else {
        const shortUrl = `${baseUrl}/${urlCode}`;

       url = new Url({
          longUrl,
          shortUrl,
          urlCode,
          date: new Date()
        });

        await url.save();
        res.redirect(baseUrl);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json('Server error');
    }
  } else {
     res.status(401).json('Invalid long url');
     }
};
  
async function deleteUrl(req, res, next) {
    try {
    const url = await findOneUrlParams(req.params.urlCode);
      if (url == null) {
        return res.sendStatus(404);
      }
    url.remove();
    res.redirect("/");
  } catch (err) {
    next(err)
  }
};

// To DO rename function 
function findOneUrlParams(urlCode) {
    return Url.findOne({ urlCode })
}

module.exports = {
  createNewShortUrl,
  deleteUrl,
  redirectToSite
}