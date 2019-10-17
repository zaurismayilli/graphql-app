
const {blogSlot}  = require('./merge');
const catSchema = require('../../model/category');
module.exports = {
    categories: async () => {
        try {
            const category = await catSchema.find()
            return category.map(cat => {
                return {
                    ...cat._doc,
                     _id: cat.id,
                     blogs:blogSlot.bind(this,cat._doc.blogs )
                    }
            })
        }catch(err) {
            throw err;
        }
    },
    deleteCategory: async (args, res) => {
        if(res.isAuth === false) {
            throw new Error("failed");
        }
        try {
            const ID = await args._id;
            const findCats = await catSchema.findByIdAndDelete(ID);
            return findCats;
        }catch(error) {
            console.log(error)
        }
    },
    updateCategory: async (args, res) => {
        if(res.isAuth === false) {
            throw new Error("failed");
        }
        try {
            const ID = await args.inputCategory._id;
            const allCats = await catSchema.findOneAndUpdate(
                { "_id": ID },
                {
                    $set: {
                        catName: args.inputCategory.catName,
                    }
                },
                { useFindAndModify: false });
                return allCats;

        }catch(err) {
            console.log(err)
        }
    },
    addCategory: async (args) => {
        try {
            const existsCat = await catSchema.findOne({catName:args.inputCategory.catName})
            if(existsCat) {
                throw new Error ('this category already added')
            }
            const add = await new catSchema({
                catName: args.inputCategory.catName
            });
            const result = await  add.save()
                return {
                    ...result._doc,
                    _id:result.id
                }

        }catch(err) {
            throw err;
        }
    }
}