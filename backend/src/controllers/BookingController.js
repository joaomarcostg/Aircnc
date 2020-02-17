const User = require('../models/User.js')
const Booking = require('../models/Booking.js')

module.exports = {
    async store(req, res) {
        try {
            const { spot_id } = req.params
            const { date } = req.body
            const { user_id } = req.headers

            const userExists = await User.findById(user_id)

            if(!userExists){
                return res.status(400).json({error: 'User does not exists'})
            }

            const booking = await Booking.create({
                date,
                user: user_id,
                spot: spot_id
            })

            await booking.populate('spot').populate('user').execPopulate()

            const ownerSocket = req.connectedUsers[booking.spot.user]

            if(ownerSocket){
                req.io.to(ownerSocket).emit('booking_request', booking)
            }

            return res.json(booking)

        } catch (err) {
            return res.json(err)
        }
    }
}