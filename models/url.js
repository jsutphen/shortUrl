const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const urlSchema = new Schema({
    originalUrl: { type: String, required: true },
    shortUrl: { type: String, required: true },
    timeCreated: { type: Date, required: true, default: Date.now, expires: 1209600 /*two weeks*/ }
});

module.exports = mongoose.model('url', urlSchema);