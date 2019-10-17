const mongodb = require('mongoose');

const Schema = mongodb.Schema;

const userSchema = new Schema({
    email:          {
        type:       String,
        required:   true 
    },
    password:       {
        type:       String,
        required:   true
    },
    profile:        {},
    blogs:          [
        {
            type:   Schema.Types.ObjectId,
            ref:    'blog'
        }
    ]
});

module.exports = mongodb.model('user', userSchema);