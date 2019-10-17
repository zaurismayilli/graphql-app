const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const contactSchema = new Schema({
    mAddrs: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    bAddrs: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('contact', contactSchema)