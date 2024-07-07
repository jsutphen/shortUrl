var express = require('express');
var router = express.Router();
const asyncHandler = require('express-async-handler');
const Url = require('../models/url');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { shortUrl: '1234' });
});

router.get('/:shortUrl', asyncHandler(async (req, res, next) => {
  const url = await Url.findOne({ shortUrl: req.params.shortUrl });
  if (url === null) {
    res.send('page not found');
  } else {
    const originalUrl = url.originalUrl;
    res.status(301).redirect('https://' + originalUrl);
  }
}));

module.exports = router; 
