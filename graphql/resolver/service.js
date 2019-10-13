const serviceSchema = require('../../model/service')
module.exports = {
    service: async (req, res) => {
        if(res.isAuth === false) {
            throw new Error ('please log in after show serrvice')
        }
        try {
            const services = await serviceSchema.find()
                return services.map(service => {
                    return {
                        ...service._doc,
                        _id:service.id
                    }
                })
        }catch(err) {
            throw err
        }
    },
    addService: async (args, res) => {
        if(res.isAuth === false) {
            throw new Error ('please log in after add serrvice')
        }
        try {
            const addServices = await new serviceSchema({
                title: args.inputService.title,
                image:args.inputService.image
            });

            const saves = await addServices.save();
               return {
                   ...saves._doc
               }

        }catch(err) {
            throw err;
        }
    }

}