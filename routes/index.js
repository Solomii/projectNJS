const express = require('express');
const router = express.Router();


const Url = require('../models/url');

router.get('/:code', async (req, res) => {
  try {
    const url = await Url.findOne({ urlCode: req.params.code });
    if (url) {
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