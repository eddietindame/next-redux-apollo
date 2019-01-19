const { User } = require('../models/User')
const { getEvents } = require('../lib')

const users = () => User.find()
    .then(users => users.map(
        user => ({
            ...user._doc,
            _id: user.id,
            createdEvents: getEvents.bind(this, user._doc.createdEvents)
        })
    ))
    .catch(error => { throw error })

module.exports = { users }
