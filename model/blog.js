const mongodb = require('mongoose')

const Schema = mongodb.Schema;

const blogSchema = new Schema({
    title:      {
        type:       String,
        required:   true
    },
    content:    {
        type:       String,
        required:   true
    },
    image:      {
        type:       String,
        required:   true
    },
    date:       {
        type:       String,
        required:   true
    },
    creator:    {
        type:   Schema.Types.ObjectId,
        ref:    'user'
    },
    category:  [
        {
            type:       Schema.Types.ObjectId,
            ref:        'category'
        }
    ]
});

module.exports = mongodb.model('blog', blogSchema )