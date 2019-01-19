const { Event } = require('../models/Event')
const { mapEvent } = require('../lib')

const events = () => Event.find()
    .then(events => events.map(event => mapEvent(event)))
    .catch(error => { throw error })

module.exports = { events }
