const Url = require("../models/url");
const shortId = require('shortid');
let validator = require('validator');
require('dotenv').config({ path: '../.env' });

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

  const urlCode = shortId.generate();

   if (validator.isURL(longUrl)) {
    try {
      let url = await Url.findOne({ longUrl });

      if (url) {
        res.status(200).json(url);
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
        res.status(201).json({message: "create new url"})
      }
    } catch (err) {
      console.error(err);
      res.status(500).json('Server error');
    }
  } else {
     res.status(401).json({message:'Invalid long url'});
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