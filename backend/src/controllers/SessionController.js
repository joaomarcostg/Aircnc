const User = require('../models/User.js')

module.exports = {

    async store(req, res){
        try{
            const {email} = req.body

            let user = await User.findOne({email})

            if(!user){
                user = await User.create({ email })
            }
            

            return res.json(user)
        }
        catch(err){
            return res.json(err)
        }
    }

}