var Message = require('../models/Message');
var bodyparser = require('body-parser');
const multiparty = require('multiparty');
var Translate = require('./translate');

module.exports = function(router) {
  router.use(bodyparser.json());

  // query DB for ALL messages
  router.get('/messages', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    Message.find({}, function(err, data) {
      if(err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }
      res.json(data);
    });
  });

  // query DB for messages for a specific channel
  router.get('/messages/:channel', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    Message.find({channelID: req.params.channel}, function(err, data) {
      if(err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }
      res.json(data);
    });
  })

  //post a new message to db
  router.post("/message", async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', '*');
    res.header("Access-Control-Allow-Headers", "*");

    const newMessage = new Message(req.body);
    newMessage.save(function (err, data) {
      if(err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }
      res.json(data);
    })
  })

  router.post("/bot/message", async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    if(!req.body.text){
      return;
    }

    const newMessage = new Message({
      "id": req.body.id,
      "channelID": req.body.channelID,
      "text": req.body.text,
      "user": req.body.user
    });
    newMessage.save(function (err, data) {
      if(err) {
        //console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }
      console.log('Good job!')
      res.json(data);
    })
  })
}
