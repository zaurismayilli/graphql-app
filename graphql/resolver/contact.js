const contactSchema = require('../../model/contact');
module.exports = {
    contact: async () => {
       
        try {
            const contacts = await contactSchema.find()
                return contacts.map(contact => {
                    return {
                        ...contact._doc
                    }
                });

        }catch(err) {
            throw err;
        }
    },
    addContact: async (args) => {
        try {
            let updated = false;
            let ID;
            const addContact = await new contactSchema({
                mAddrs: args.inputContact.mAddrs,
                email:  args.inputContact.email,
                mobile: args.inputContact.mobile,
                bAddrs: args.inputContact.bAddrs
            });
            const lengthContact = await contactSchema.find()
            if(lengthContact.length > 0) {
                await lengthContact.map(lCon => {
                    updated = true;
                    return ID = lCon._id
                })
            }
            if(updated === false) {
                await addContact.save()
                    return {
                        ...addContact._doc
                    }
            }else {
               await contactSchema.updateOne({'_id': ID}, {$set: { 
                    mAddrs: args.inputContact.mAddrs,
                    email:  args.inputContact.email,
                    mobile: args.inputContact.mobile,
                    bAddrs: args.inputContact.bAddrs
                }}, {multi: true})
            }
    
        }catch(err) {
            throw err;
        }
    }
}   