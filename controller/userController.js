const asyncHandler = require('express-async-handler')
const UserModel = require('../models/UserModel');
const generateToken = require('../utils/generateToken')

exports.getUsers = asyncHandler(async (req, res) => {

    const users = await UserModel.find({})

    if (users) {
        return res.json(users)
    } else {
        res.status(404).json({ message: 'User not found!!' })
    }
}
)


exports.getUserByID = asyncHandler(async (req, res) => {

    const user = await UserModel.findById(req.params.id).select('-password');

    if (user) {
        res.json(user)
    } else {
        res.status(404).json({ message: 'User not found!!' })
    }

})


exports.getUserProfile = asyncHandler(async (req, res) => {

    const user = await UserModel.findById(req?.user?._id)

    if (user) {
        res.json({
            "_id": "6452f5d697dec7e99c7e029b",
            "firstName": "John",
            "lastName": "Doe",
            "email": "johndoe@example.com",
            "isAdmin": true,

        })
    } else {
        res.status(404).json({ message: 'User not found!!' })
    }

})


exports.authUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email }).exec();

        if (user && user.matchPassword(password)) {
            res.json({
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (err) {
        console.log('Error in authUser:', err);
        res.status(500).json({ message: 'Server Error' });
    }
});



exports.registerUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        const existUser = await UserModel.findOne({ email })

        if (existUser) {
            res.status(400)
                .json({ message: 'User already exist' });
        }

        const user = await UserModel.create({
            firstName,
            lastName,
            email,
            password
        })

        if (user) {

            res.status(201).json({
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            });

        } else {

            res.status(400)
                .json({ message: 'Invalid user data' });
        }


    } catch (err) {
        console.log('Error in registerUser:', err);
        res.status(500).json({ message: 'Server Error' });
    }
});


