const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { User } = require('../models/User')

const TOKEN_EXPIRATION = 1

const login = async ({ email, password }) => {
    const user = await User.findOne({ email })
    if (!user) throw new Error('User does not exist!')

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) throw new Error('Password is incorrect!')

    const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.PRIVATE_KEY,
        { expiresIn: TOKEN_EXPIRATION + 'h' }
    )

    return {
        userId: user.id,
        token,
        tokenExpiration: TOKEN_EXPIRATION
    }
}

module.exports = { login }
