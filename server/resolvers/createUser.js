const bcrypt = require('bcryptjs')
const { User } = require('../models/User')
const { mapUser } = require('../lib')

const createUser = async ({ email, password }) => {
    try {
        const _user = await User.findOne({ email: email })
        if (_user) throw new Error('User exists already.')
        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new User({
            email: email,
            password: hashedPassword
        })
        return mapUser(await user.save())
    } catch (error) { throw error }
}

module.exports = { createUser }
