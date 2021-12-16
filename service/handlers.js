const Url = require("../models/url");
const shortId = require("shortid");
const client = require("../lib/redis");
let validator = require("validator");

async function redirectToSite(req, res, next) {
  try {
    const urlCode = req.params.urlCode;
    if (urlCode) {
      const longUrl = await client.get(urlCode, (err, result) => {
        if (err) {
          condole.error(err);
        }
        return result;
      });
      if (longUrl) {
        return res.redirect(longUrl);
      } else {
        const url = await findCodeFromDatabase(urlCode);
        if (url) {
          url.clicks++;
          url.save();
          return res.redirect(url.longUrl);
        } else {
          return res.status(404).json({ message: "no url found" });
        }
      }
    } else {
      return res.status(400).json({ message: "bad request" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
}

async function createNewShortUrl(req, res, next) {
  const { longUrl } = req.body;
  const baseUrl = process.env.BASE_URL;
  const urlCode = shortId.generate();

  if (validator.isURL(longUrl)) {
    try {
      client.set(urlCode, longUrl, (error, result) => {
        if (error) condole.error(error);
        return result;
      });
      let urlFromMongo = await Url.findOne({ longUrl });
       if (urlFromMongo) {
        return res.status(409).json({message: "URL Already Exist","urlCode":urlFromMongo.urlCode})
      } else {
        const shortUrl = `${baseUrl}/${urlCode}`;
        let newURL = new Url({
          longUrl,
          shortUrl,
          urlCode,
          date: new Date(),
        });
        await newURL.save();
        return res.redirect(baseUrl);
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        status: "error",
        message: "Server error",
      });
    }
  } else {
    return res.status(401).json({ message: "Invalid long url" });
  }
}

async function deleteUrl(req, res, next) {
  try {
    const url = await findCodeFromDatabase(req.params.urlCode);
    if (url == null) {
      return res.sendStatus(404);
    }
    url.remove();
    res.redirect("/");
  } catch (err) {
    next(err);
  }
}

function findCodeFromDatabase(urlCode) {
  return Url.findOne({ urlCode });
}

module.exports = {
  createNewShortUrl,
  deleteUrl,
  redirectToSite,
};
