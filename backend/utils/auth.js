const jwt = require('jsonwebtoken')

// generate token for user

const generateToken = (user) => {
    return jwt.sign({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
    }, process.env.JWT_SECRET, { expiresIn: '1h' })
}

// get token from request
const verifyToken = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    console.log("decoded", decoded)
    res.status(200).json({ message: 'Token verified', data: decoded })
}


module.exports = { generateToken, verifyToken };