const User = require('../models/User');
const Pin = require('../models/Pin');

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password')
      .lean();

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Add counts
    const pinsCount = await Pin.countDocuments({ author: user._id });
    user.pinsCount = pinsCount;
    user.followersCount = user.followers?.length || 0;
    user.followingCount = user.following?.length || 0;
    user.savedPinsCount = user.savedPins?.length || 0;

    res.json(user);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Server error fetching user' });
  }
};

// Get user's saved pins
exports.getSavedPins = async (req, res) => {
  try {
    const userId = req.params.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const total = user.savedPins.length;
    const savedPinIds = user.savedPins.slice(skip, skip + limit);

    const pins = await Pin.find({ _id: { $in: savedPinIds } })
      .populate('author', 'username avatar')
      .sort({ createdAt: -1 });

    res.json({
      pins,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalPins: total
    });
  } catch (error) {
    console.error('Get saved pins error:', error);
    res.status(500).json({ message: 'Server error fetching saved pins' });
  }
};
