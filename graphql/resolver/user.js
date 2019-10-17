
const { blogSlot }  = require('./merge');
const userSchema = require('../../model/user');
const bcryptjs  = require('bcryptjs');
const jwt = require('jsonwebtoken')
module.exports = {
    login: async ({email, password}) => {
        try {
            const user = await userSchema.findOne({email:email});
            if(!user) {
                throw new Error ('user not found')
            }
            const hasPass = await bcryptjs.compare(password, user.password);
            if(!hasPass) {
                throw new Error ('user password do not match')
            }

            const token = jwt.sign({userId:user._id, email:user.email }, 'specialToken', {
                expiresIn: '1h'
            });
            return {
                userId: user._id,
                token:token,
                tokenEx:1,
                profile:user.profile[0]
            }
        }catch(err) {
            throw err;
        }
    },
    users: async () => {
        try {
            const user = await userSchema.find()
                return user.map(userVal => {
                    return {
                        ...userVal._doc,
                        _id:userVal.id,
                        password:null,
                        profile:userVal._doc.profile[0],
                        blogs:blogSlot.bind(this,userVal._doc.blogs )
                    }
                })
        }catch(err ){
            throw err;
        }
    },
    addUser: async (args) => {
        try {
            const userExists = await userSchema.findOne({email: args.inputUser.email})
            if(userExists) {
                throw new Error ('user already consist')
            }
            const hash = await bcryptjs.hash(args.inputUser.password, 12)
            const add = await new userSchema({
                email:      args.inputUser.email,
                password:   hash,
                profile:    [
                    {
                        nickname: args.inputUser.profile.nickname,
                        firstname: args.inputUser.profile.firstname,
                        lastname: args.inputUser.profile.lastname
                    }
                ]
            });
            const addSaver = await add.save()

                return {
                    ...addSaver._doc,
                    _id:    addSaver.id,
                    profile:addSaver._doc.profile[0],
                    password: null
                }
        }catch(err) {
            throw err;
        }
    }
}