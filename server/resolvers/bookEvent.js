const { Booking } = require('../models/Booking')
const { Event } = require('../models/Event')
const { mapEvent } = require('../lib')

const bookEvent = async (
    { eventId },
    {
        isAuth,
        userId
    }
) => {
    if (!isAuth) throw new Error('Unauthenticated')
    try {
        const event = await Event.findOne({ _id: eventId })
        const booking = new Booking({ userId, event })
        await booking.save()
        return mapEvent(event)
    } catch (error) { throw error }
}

module.exports = { bookEvent }
