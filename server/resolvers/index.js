const { events } = require('./events')
const { users } = require('./users')
const { bookings } = require('./bookings')
const { bookEvent } = require('./bookEvent')
const { cancelBooking } = require('./cancelBooking')
const { createEvent } = require('./createEvent')
const { createUser } = require('./createUser')
const { login } = require('./login')

module.exports = {
    events,
    users,
    bookings,
    createEvent,
    createUser,
    bookEvent,
    cancelBooking,
    login,
    message: () => 'Hello World!',
    add: ({ num1, num2 }) => num1 + num2
}
