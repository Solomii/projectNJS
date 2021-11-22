const express = require('express');
const router = express.Router();


const Url = require('../models/url');

router.get('/:urlCode', async (req, res) => {
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
})

module.exports = router;