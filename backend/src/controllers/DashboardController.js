const User = require('../models/User.js')
const Spot = require('../models/Spot.js')

module.exports = {
    async show(req, res) {
        try {

            const { user_id } = req.headers

            const userExists = await User.findById(user_id)

            if (!userExists) {
                return res.status(400).json({ error: 'User does not exists' })
            }

            const spots = await Spot.find({ user: user_id })
            return res.json(spots)

        }
        catch (err) {
            return res.json(err)
        }

    }
}