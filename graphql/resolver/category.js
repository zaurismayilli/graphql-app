
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