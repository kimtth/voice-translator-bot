'use strict';

var mongoose = require('mongoose');

const { Schema } = mongoose;

var messageSchema = new Schema({
  id: String,
  channelID: String,
  text: String,
  user: String,
  sentDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Message', messageSchema);