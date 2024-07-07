var express = require('express');
var router = express.Router();
const asyncHandler = require('express-async-handler');
const Url = require('../models/url');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

function makeId() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const LENGTH = 4;
  for (i = 0; i < LENGTH; i++) {
    const nextLetter = characters.charAt(Math.floor(Math.random() * characters.length));
    result += nextLetter;
  }
  return result;
}

router.post('/', asyncHandler(async (req, res, next) => {
  const originalUrl = req.body.originalUrl;
  let shortUrl;
  while(true) {
    shortUrl = makeId();
    const alreadyExistsTest = await Url.findOne({ shortUrl: shortUrl });
    if (alreadyExistsTest === null) break;
  }
  const url = new Url({ originalUrl: originalUrl, shortUrl: shortUrl });
  await url.save();
  res.render('index', { shortUrl: shortUrl });
}));

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
