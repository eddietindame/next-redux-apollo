const { Booking } = require('../models/Booking')
const { mapEvent } = require('../lib')

const cancelBooking = async (
    { bookingId },
    { isAuth }
) => {
    if (!isAuth) throw new Error('Unauthenticated')
    try {
        const booking = await Booking
            .findById(bookingId)
            .populate('event')
        const event = mapEvent(booking.event)
        await Booking.deleteOne({ _id: bookingId })
        return event
    } catch (error) { throw error }
}

module.exports = { cancelBooking }
