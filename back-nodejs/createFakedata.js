var mongoose = require('mongoose');
var Channel = require('./models/channel');
var User = require('./models/user');
var Message = require('./models/message');

createFakeData = function() {
  // 0, 1, ... 39 로 이루어진 배열 생성 후 포스트 데이터로 변환
  const channels = [...Array(10).keys()].map(i => ({
    id: `${i}`,
    name:
      `Test${i}`
  }));
  Channel.insertMany(channels, (err, docs) => {
    console.log(docs);
  });

  const users = [...Array(10).keys()].map(i => ({
    username: `user${i}`,
    password: `user${i}`,
    email: `user${i}@mail.com`
  }));
  User.insertMany(users, (err, docs) => {
    console.log(docs);
  });

  const messages = [...Array(10).keys()].map(i => ({
    id: `${i}`,
    channelID: '1',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
    user: 'user1',
  }));
  Message.insertMany(messages, (err, docs) => {
    console.log(docs);
  });

  const messages2 = [...Array(10).keys()].map(i => ({
    id: `${i}`,
    channelID: '1',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
    user: 'user2',
  }));
  Message.insertMany(messages2, (err, docs) => {
    console.log(docs);
  });

}

module.exports = createFakeData