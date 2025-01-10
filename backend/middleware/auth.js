const { verifyToken } = require('../utils/auth')

exports.authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: 'Unauthorized' })
        }
        const token = authHeader.split(' ')[1]
        const decoded = await verifyToken(token)
        req.user = decoded
        next()
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized' })
    }
}
