const { Booking } = require('../models/Booking')
const { mapBooking } = require('../lib')

const bookings = () => Booking.find()
    .then(bookings => bookings.map(booking => mapBooking(booking)))
    .catch(error => { throw error })

module.exports = bookings
