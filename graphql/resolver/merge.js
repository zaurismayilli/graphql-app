const blogSchema = require('../../model/blog');
const catSchema = require('../../model/category');
const userSchema = require('../../model/user');

const catSlot = async catId => {
    try {
        const category = await catSchema.findById(catId)
            return {
                ...category._doc,
                _id:category.id,
                blogs:blogSlot.bind(this, category._doc.blogs )
            }
    }catch(err){
        throw err;
    }
}

const blogSlot = async blogId => {
    try {
        const blogs = await blogSchema.findById(blogId)
            return {
                ...blogs._doc,
                _id:blogs.id,
                category:catSlot.bind(this, blogs._doc.category ),
                creator:userSlot.bind(this, blogs._doc.creator)
            }
    }catch(err) {
        throw err;
    }
}

const userSlot = async userId => {
    try {
        const user = await userSchema.findById(userId);
            return {
                ...user._doc,
                _id:user.id,
                profile:user.profile[0],
                password:null,
                blogs:blogSlot.bind(this, user._doc.blogs)
             }
    }catch(err) {
        throw err;
    }
}

module.exports = {
    catSlot,
    blogSlot,
    userSlot
} 