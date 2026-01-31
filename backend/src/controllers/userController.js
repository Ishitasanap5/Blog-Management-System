import User from '../models/User.js';

// GET: User Profile
export const getProfile = async (req, res) => {
    try {
        // req.user.id comes from the Auth Middleware
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// PUT: Update Profile
export const updateProfile = async (req, res) => {
    try {
        const { name, email } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            { name, email },
            { new: true, runValidators: true }
        );
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: "Update failed", error: error.message });
    }
};