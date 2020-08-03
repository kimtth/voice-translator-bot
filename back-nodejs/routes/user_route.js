'user strict';

var bodyparser = require('body-parser');
var User = require('../models/User');

module.exports = function loadUserRoutes(router, passport) {
  router.use(bodyparser.json());

  // get usernames for validating whether a username is available
  router.get('/alluser', function(req, res) {
    User.find({'username': { $exists: true } }, function(err, data) {
      if(err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }
      res.json(data);
    });
  })
};
