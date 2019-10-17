const serviceSchema = require('../../model/service')
module.exports = {
    service: async (req, res) => {
        if (res.isAuth === false) {
            throw new Error('please log in after show serrvice')
        }
        try {
            const services = await serviceSchema.find()
            return services.map(service => {
                return {
                    ...service._doc,
                    _id: service.id
                }
            })
        } catch (err) {
            throw err
        }
    },
    deleteService: async (args, res) => {
        if(res.isAuth === false) {
            throw new Error ('please log in after show serrvice')
        }

        try {
            const ID = await args._id;
            const removeData = await serviceSchema.findByIdAndDelete(ID);
            return removeData;
        } catch (err) {
            console.log(err)
        }
    },
    updateService: async (args, res) => {
        if(res.isAuth) {
            throw new Error("failed");
        }
        try {
            const ID = await args.inputService._id;
            const allServices = await serviceSchema.findOneAndUpdate(
                { "_id": ID },
                {
                    $set: {
                        title: args.inputService.title,
                        image: args.inputService.image
                    }
                },
                { useFindAndModify: false });
                return allServices;
        }catch(err) {
            console.log(err);
        }
    },
    addService: async (args, res) => {
        if (res.isAuth === false) {
            throw new Error('please log in after add serrvice')
        }
        try {
            const addServices = await new serviceSchema({
                title: args.inputService.title,
                image: args.inputService.image
            });

            const saves = await addServices.save();
            return {
                ...saves._doc
            }

        } catch (err) {
            throw err;
        }
    }

}