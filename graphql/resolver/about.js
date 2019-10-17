const About = require('../../model/about');

module.exports = {
    about: async (req, res) => {
        // if(res.isAuth === false) {
        //     throw new Error ("log in")
        // }
        try {
            const aboutResult =  await  About.find()
                return aboutResult.map(data => {
                    return {
                        ...data._doc
                    }
                })
            
        }catch(err) {
            throw err;
        }
    },
    addAbout: async (req, res) => {
        if(res.isAuth === false) {
            throw new Error ("log in")
        }
        try {
            const aboutInfo = new About({
                title:      req.inputAbout.title,
                content:    req.inputAbout.content
            });
                const showAb = await About.find();
                let created = true;
                let ID ;
                await  showAb.map(result => {
                    if(showAb.length === 0) {
                       return  created ;
                    }else {
                        return showAb.map(data => {
                            created = false;
                            return ID = data._id
                        })
                    }
                });
                if(created === true) {
                    const res = await  aboutInfo.save()
                    return {
                        ...res._doc
                    }
                }else {
                await About.updateOne({'_id': ID}, 
                    {$set: 
                        {
                        title:req.inputAbout.title,
                        content: req.inputAbout.content
                        }
                    },
                    {multi: true});
                }
            
        }catch(err) {
            throw err;
        }

    }
}