var express = require('express');
var router = express.Router();

var request = require('request');

router.get('/list', function(req, res, next) {
  request.get({
    url: 'http://phobos.apple.com/WebObjects/MZStoreServices.woa/ws/RSS/toppaidapplications/limit=100/json',
    encoding: 'utf-8',
    gzip: true
  }, function (apiError, apiRes, apiBody) {
    // Errors are not accounted for

    var data = JSON.parse(apiBody);
    var entries = data.feed.entry;

    res.json(entries);
  });
});

router.get('/details/:appId', function(req, res, next) {
  const appId = req.params.appId;

  request.get({
    url: 'http://phobos.apple.com/WebObjects/MZStoreServices.woa/ws/RSS/toppaidapplications/limit=100/json',
    encoding: 'utf-8',
    gzip: true
  }, function (apiError, apiRes, apiBody) {
    // Errors are not accounted for
    var data = JSON.parse(apiBody);
    var entries = data.feed.entry;
    var entry = entries.find(val => val['id']['attributes']['im:id'] === appId);

    res.json(entry);
  });
});

module.exports = router;
