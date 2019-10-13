const mongodb = require('mongoose')

const Schema = mongodb.Schema;

const catSchema = new Schema({
    catName:      {
        type:       String,
        required:   true
    },
    blogs:        [
        {
            type:   Schema.Types.ObjectId,
            ref:    'blog'
        }
    ]
});

module.exports = mongodb.model('category', catSchema )