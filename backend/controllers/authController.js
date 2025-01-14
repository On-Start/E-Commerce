const User = require('../models/user')
const bcrypt = require('bcrypt')
const { generateToken } = require('../utils/auth')

exports.register = async (req, res) => {
    console.log("req.body", req.body)
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            console.log(error)
            return res.status(400).json({ message: 'User already exists' })
        }
        const newUser = await User.create({ name, email, password})
        return res.status(201).json({ message: 'User created successfully', user: newUser })
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' })
    }
}

exports.login = async (req, res) => {
    console.log(req.body)
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = generateToken(user);

        return res.status(200).json({ message: 'Login successful',  user, token  })
    } catch (error) {
        console.log("error", error)
        res.status(500).json({ message: 'Internal server error' })
    }

}

// const bcrypt = require('bcrypt');
// const User = require('../models/user');
// const { generateToken } = require('../utils/auth'); // Assuming generateToken function is in utils/auth

// // User Registration (Sign Up)
// exports.signUp = async (req, res) => {
//     try {
//         const { name, email, password } = req.body;

//         // Check if the user already exists
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ message: 'User already exists' });
//         }

//         // Hashing the password before saving
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Create a new user with hashed password
//         // const newUser = await User.create({ name, email, password: hashedPassword });

//         // Respond with success message
//         return res.status(201).json({ message: 'User created successfully', user: newUser });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Internal server error', error: error.message });
//     }
// };

// // User Login
// exports.login = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         // Find the user by email
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(401).json({ message: 'Invalid email or password' });
//         }

//         // Compare the entered password with the stored hashed password
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(401).json({ message: 'Invalid email or password' });
//         }

//         // Generate a JWT token
//         const token = generateToken(user);

//         // Respond with user data and token
//         return res.status(200).json({
//             message: 'Login successful',
//             data: { user: { id: user._id, name: user.name, email: user.email }, token },
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Internal server error', error: error.message });
//     }
// };
