const Url = require("../models/url");
const shortId = require('shortid');
const client = require("../lib/redis");
let validator = require('validator');
const DEFAULT_EXPIRATION = 3600;

async function redirectToSite(req, res, next) {
  try {
    const urlCode = req.params.urlCode;
    
    client.get(urlCode, (err, result) => {
      if (err) {
        condole.error(err)
      };
      if (result) {
        console.log(result)
      }
    });
    const url = await findOneUrlParams(req.params.urlCode);
    if (url) {
      url.clicks++;
      url.save();
      return res.redirect(url.longUrl)
    } else {
      return res.status(404).json({ message: "no url found" })
    }
  } catch (error) {
    console.log(error);
     return res.status(500).json({message: 'Server error'});
  }
};

async function createNewShortUrl(req, res, next) {
  const { longUrl } = req.body;
  const baseUrl = process.env.BASE_URL;
  const urlCode = shortId.generate();
 
   if (validator.isURL(longUrl)) {
     try {
        let urlFromMongo = await Url.findOne({ longUrl });
      if (urlFromMongo) {
        res.status(200).json(urlFromMongo);
      } else {
        const shortUrl = `${baseUrl}/${urlCode}`;

       let newURL = new Url({
          longUrl,
          shortUrl,
          urlCode,
          date: new Date()
        });
          client.set(urlCode, urlFromMongo, (error, result) => {
         if (error) {
            condole.error(error)
          };
         if (result) {
           console.log(result);
         }
     })
        await newURL.save();
        res.redirect(baseUrl);
        res.status(201).json({message: "create new url"})
      }
     } catch (err) {
      console.error(err);
      res.status(500).json({
         status: 'error',
         message: 'Server error'
       });
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