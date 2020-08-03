'use strict';

var mongoose = require('mongoose');

const { Schema } = mongoose;

var channelSchema = new Schema({
  id: String,
  name: { type:String, unique: true },
  publishedDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Channel', channelSchema);