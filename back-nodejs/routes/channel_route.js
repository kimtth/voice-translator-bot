var Channel = require('../models/Channel');
var bodyparser = require('body-parser');

// Find All
module.exports = function (router) {
  router.get('/channels', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Content-Type', 'application/json');
    Channel.find({})
      .then((channels) => {
        if (!channels.length) return res.status(404).send({
          err: 'channel not found'
        });
        res.send(JSON.stringify({channels}));
      })
      .catch(err => res.status(500).send(err));
  });

  router.post('/channels/:name', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    Channel.create(req.body)
      .then(channel => res.send(channel))
      .catch(err => res.status(500).send(err));
  });
}