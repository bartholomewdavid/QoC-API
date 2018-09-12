var express = require('express');
var router = express.Router();

var request = require('request');

router.get('/list', function(req, res, next) {
  request.get({
    url: 'https://webhook.site/8a7e3773-a3b9-44c2-b0e6-004284d877dd',
    headers: {
      'content-type': 'text/javascript; charset=UTF-8'
    }
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
    url: 'https://webhook.site/8a7e3773-a3b9-44c2-b0e6-004284d877dd',
    headers: {
      'content-type': 'text/javascript; charset=UTF-8'
    }
  }, function (apiError, apiRes, apiBody) {
    // Errors are not accounted for
    var data = JSON.parse(apiBody);
    var entries = data.feed.entry;
    var entry = entries.find(val => val['id']['attributes']['im:id'] === appId);

    res.json(entry);
  });
});

module.exports = router;
