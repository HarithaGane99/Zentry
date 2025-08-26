const User = require("../Model/UserModel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    });
};

// Register a new user (for public registration)
const registerUser = async (req, res) => {
    const { name, gmail, age, address, phone, password } = req.body;

    try {
        // Check if user already exists
        const userExists = await User.findOne({ gmail });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user (role defaults to 'user')
        const user = await User.create({
            name,
            gmail,
            age,
            address,
            phone,
            password: hashedPassword,
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                gmail: user.gmail,
                role: user.role,
                token: generateToken(user._id, user.role),
            });
        } else {
            res.status(400).json({ message: "Invalid user data" });
        }
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Server error during registration" });
    }
};

// Login user
const loginUser = async (req, res) => {
    const { gmail, password } = req.body;

    try {
        // Check for user by email
        const user = await User.findOne({ gmail });

        // Check if user exists and password matches
        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user._id,
                name: user.name,
                gmail: user.gmail,
                role: user.role,
                token: generateToken(user._id, user.role),
            });
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ message: "Server error during login" });
    }
};

// Admin: Add a new user
const addUsers = async (req, res) => {
    const { name, gmail, age, address, phone, password, role } = req.body;
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = new User({
            name,
            gmail,
            age,
            address,
            phone,
            password: hashedPassword,
            role: role || 'user' // Admin can optionally set a role
        });
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        console.error("Error adding user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


// Get all users (Admin only)
const getAllUsers = async (req, res) => {
    let users;
    try {
        users = await User.find({}, '-password'); // Don't send back the password
    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({ message: "Server error" });
    }
    if (!users) {
        return res.status(404).json({ message: "No users found" });
    }
    return res.status(200).json({ users });
};

// Get user by ID (Admin only)
const getById = async (req, res) => {
    const { id } = req.params;
    let user;
    try {
        user = await User.findById(id).select('-password');
    } catch (error) {
        console.error("Error fetching user:", error);
        return res.status(500).json({ message: "Server error" });
    }
    if (!user) {
        return res.status(404).json({ message: "No user found" });
    }
    return res.status(200).json({ user });
};

// Update user (Admin only)
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, gmail, age, address, phone } = req.body;
    try {
        const user = await User.findByIdAndUpdate(id, {
            name,
            gmail,
            age,
            address,
            phone
        }, { new: true });
        if (!user) {
            return res.status(404).json({ message: "No user found" });
        }
        res.status(200).json({ user });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Delete user (Admin only)
const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: "No user found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get own profile (Logged-in user)
const getMyProfile = async(req, res) => {
    try {
        // req.user is attached by the auth middleware
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

const updateMyProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (user) {
            user.name = req.body.name || user.name;
            user.gmail = req.body.gmail || user.gmail;
            user.age = req.body.age || user.age;
            user.address = req.body.address || user.address;
            user.phone = req.body.phone || user.phone;

            const updatedUser = await user.save();
            
            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                gmail: updatedUser.gmail,
                role: updatedUser.role,
                // We don't need to send a new token unless the role changes
            });

        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.registerUser = registerUser;
exports.loginUser = loginUser;
exports.addUsers = addUsers;
exports.getAllUsers = getAllUsers;
exports.getById = getById;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.getMyProfile = getMyProfile;
exports.updateMyProfile = updateMyProfile;