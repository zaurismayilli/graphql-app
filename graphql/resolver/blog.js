
const { catSlot, userSlot } = require('./merge');
const blogSchema = require('../../model/blog');
const catSchema = require('../../model/category');
const userSchema = require('../../model/user');

const transform = async blog => {
    return {
        ...blog._doc,
        _id: blog.id,
        category: catSlot.bind(this, blog._doc.category),
        creator: userSlot.bind(this, blog._doc.creator)
    }
}
module.exports = {
    blogs: async (req, res) => {
        // if(res.isAuth === false) {
        //     throw new Error ('please logged in after show blog ')
        // }
        try {

            const blogs = await blogSchema.find()
            return blogs.map(blog => {
                return transform(blog)
            })
        } catch (err) {
            throw err;
        }
    },
    singleBlog: async (req, res) => {
        if (res.isAuth === false) {
            throw new Error('failed ')
        }
        try {
            const singleBlog = await blogSchema.findById(req._id);
            return transform(singleBlog);
        } catch (error) {
            throw error;
        }
    },
    deleteBlog: async (args, res) => {
        if (res.isAuth === false) {
            throw new Error('failed ')
        }

        try {
            const ID = await args._id;
            const allBlog = await blogSchema.findByIdAndDelete(ID);
            return allBlog;
        } catch (err) {
            console.log(err)
        }
    },
    updateBlog: async (args, res) => {
        if (res.isAuth === false) {
            throw new Error('failed ')
        }

        try {
            const ID = await args.inputUpdateBlog._id;
            const allBlog = await blogSchema.findOneAndUpdate(
                { "_id": ID },
                {
                    $set: {
                        title: args.inputUpdateBlog.title,
                        image:args.inputUpdateBlog.image,
                        content: args.inputUpdateBlog.content
                    }
                },
                { useFindAndModify: false });
                return allBlog;
        } catch (err) {
            console.log(err)
        }
    },
    addBlog: async (args, res) => {
        if (res.isAuth === false) {
            throw new Error('failed ')
        }
        try {
            const add = await new blogSchema({
                title: args.inputBlog.title,
                content: args.inputBlog.content,
                image: args.inputBlog.image,
                date: args.inputBlog.date,
                category: args.inputBlog.category,
                creator: args.inputBlog.creator
            });
            let addResult;
            const result = await add.save()

            addResult = transform(result)

            const addUser = await userSchema.findById(args.inputBlog.creator)
            if (!addUser) {
                throw new Error('user not found');
            }
            addUser.blogs.push(add);
            await addUser.save();

            const addCats = await catSchema.findById(args.inputBlog.category);
            if (!addCats) {
                throw new Error('category not selected');
            }
            addCats.blogs.push(add);
            await addCats.save();
            return addResult;
        } catch (err) {  
            throw err;
        }
    }
}