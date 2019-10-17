const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const subsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        require: require
    },
    subject: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('subscribe', subsSchema);