const { Event } = require('../models/Event')
const { User } = require('../models/User')

const mapEvent = event => ({
    ...event._doc,
    _id: event.id,
    creator: getUser.bind(this, event.creator)
})

const mapUser = user => ({
    ...(user)._doc,
    _id: user.id,
    createdEvents: getEvents.bind(this, user._doc.createdEvents),
    password: null
})

const mapBooking = booking => ({
    ...booking._doc,
    _id: booking.id,
    createdAt: new Date(booking._doc.createdAt).toISOString(),
    updatedAt: new Date(booking._doc.updatedAt).toISOString(),
    event: getEvent.bind(this, booking._doc.event),
    user: getUser.bind(this, booking._doc.user)
})

const getUser = userId => User.findById(userId)
    .then(user => mapUser(user))
    .catch(error => { throw error })

const getEvent = eventId => Event.findById(eventId)
    .then(event => mapEvent(event))
    .catch(error => { throw error })

const getEvents = eventIds => Event.find({
    _id: { $in: eventIds }
})
    .then(events => events.map(event => mapEvent(event)))
    .catch(error => { throw error })

module.exports = {
    mapUser,
    mapEvent,
    mapBooking,
    getUser,
    getEvent,
    getEvents
}
