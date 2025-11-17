const Pin = require('../models/Pin');
const User = require('../models/User');
const { validationResult } = require('express-validator');

// Create a new pin
exports.createPin = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'Image is required' });
    }

    const { title, description, tags, category, imageWidth, imageHeight } = req.body;

    const pin = new Pin({
      title,
      description,
      image: `/uploads/${req.file.filename}`,
      imageWidth: imageWidth || 0,
      imageHeight: imageHeight || 0,
      author: req.userId,
      tags: tags ? (Array.isArray(tags) ? tags : tags.split(',').map(t => t.trim())) : [],
      category: category || 'other'
    });

    await pin.save();
    await pin.populate('author', '-password');

    res.status(201).json({
      message: 'Pin created successfully',
      pin
    });
  } catch (error) {
    console.error('Create pin error:', error);
    res.status(500).json({ message: 'Server error during pin creation' });
  }
};

// Get all pins with pagination
exports.getPins = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const category = req.query.category;
    const search = req.query.search;
    const sort = req.query.sort || 'latest'; // latest, popular, trending

    let query = {};
    if (category && category !== 'all') {
      query.category = category;
    }
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $regex: search, $options: 'i' } }
      ];
    }

    let pins;
    const total = await Pin.countDocuments(query);

    if (sort === 'popular' || sort === 'trending') {
      // Use aggregation for sorting by calculated fields
      const aggregationPipeline = [
        { $match: query },
        {
          $addFields: {
            likesCount: { $size: '$likes' }
          }
        }
      ];

      if (sort === 'popular') {
        aggregationPipeline.push({ $sort: { likesCount: -1, saves: -1, createdAt: -1 } });
      } else {
        aggregationPipeline.push({ $sort: { views: -1, likesCount: -1, createdAt: -1 } });
      }

      aggregationPipeline.push(
        { $skip: skip },
        { $limit: limit },
        {
          $lookup: {
            from: 'users',
            localField: 'author',
            foreignField: '_id',
            as: 'author'
          }
        },
        { $unwind: '$author' },
        {
          $project: {
            'author.password': 0
          }
        }
      );

      pins = await Pin.aggregate(aggregationPipeline);
    } else {
      // Default: sort by latest
      pins = await Pin.find(query)
        .populate('author', 'username avatar')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
    }

    res.json({
      pins,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalPins: total
    });
  } catch (error) {
    console.error('Get pins error:', error);
    res.status(500).json({ message: 'Server error fetching pins' });
  }
};

// Get a single pin
exports.getPin = async (req, res) => {
  try {
    const pin = await Pin.findById(req.params.id)
      .populate('author', 'username avatar bio')
      .populate('comments.user', 'username avatar');

    if (!pin) {
      return res.status(404).json({ message: 'Pin not found' });
    }

    // Increment views
    pin.views += 1;
    await pin.save();

    res.json(pin);
  } catch (error) {
    console.error('Get pin error:', error);
    res.status(500).json({ message: 'Server error fetching pin' });
  }
};

// Get related pins
exports.getRelatedPins = async (req, res) => {
  try {
    const pin = await Pin.findById(req.params.id);

    if (!pin) {
      return res.status(404).json({ message: 'Pin not found' });
    }

    const limit = parseInt(req.query.limit) || 12;

    // Find related pins based on tags and category
    const query = {
      _id: { $ne: pin._id }, // Exclude current pin
      $or: []
    };

    // Add category match
    if (pin.category) {
      query.$or.push({ category: pin.category });
    }

    // Add tag matches
    if (pin.tags && pin.tags.length > 0) {
      query.$or.push({ tags: { $in: pin.tags } });
    }

    // If no criteria, just get random pins
    if (query.$or.length === 0) {
      delete query.$or;
    }

    const relatedPins = await Pin.find(query)
      .populate('author', 'username avatar')
      .limit(limit)
      .sort({ views: -1, createdAt: -1 });

    res.json({ pins: relatedPins });
  } catch (error) {
    console.error('Get related pins error:', error);
    res.status(500).json({ message: 'Server error fetching related pins' });
  }
};

// Update pin
exports.updatePin = async (req, res) => {
  try {
    const pin = await Pin.findById(req.params.id);

    if (!pin) {
      return res.status(404).json({ message: 'Pin not found' });
    }

    if (pin.author.toString() !== req.userId.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this pin' });
    }

    const { title, description, tags, category } = req.body;
    if (title) pin.title = title;
    if (description) pin.description = description;
    if (tags) pin.tags = Array.isArray(tags) ? tags : tags.split(',').map(t => t.trim());
    if (category) pin.category = category;

    await pin.save();
    await pin.populate('author', '-password');

    res.json({
      message: 'Pin updated successfully',
      pin
    });
  } catch (error) {
    console.error('Update pin error:', error);
    res.status(500).json({ message: 'Server error updating pin' });
  }
};

// Delete pin
exports.deletePin = async (req, res) => {
  try {
    const pin = await Pin.findById(req.params.id);

    if (!pin) {
      return res.status(404).json({ message: 'Pin not found' });
    }

    if (pin.author.toString() !== req.userId.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this pin' });
    }

    await Pin.findByIdAndDelete(req.params.id);

    res.json({ message: 'Pin deleted successfully' });
  } catch (error) {
    console.error('Delete pin error:', error);
    res.status(500).json({ message: 'Server error deleting pin' });
  }
};

// Like/unlike a pin
exports.toggleLike = async (req, res) => {
  try {
    const pin = await Pin.findById(req.params.id);

    if (!pin) {
      return res.status(404).json({ message: 'Pin not found' });
    }

    const likeIndex = pin.likes.indexOf(req.userId);

    if (likeIndex > -1) {
      pin.likes.splice(likeIndex, 1);
    } else {
      pin.likes.push(req.userId);
    }

    await pin.save();

    res.json({
      message: likeIndex > -1 ? 'Pin unliked' : 'Pin liked',
      likesCount: pin.likes.length,
      isLiked: likeIndex === -1
    });
  } catch (error) {
    console.error('Toggle like error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Save/unsave a pin
exports.toggleSave = async (req, res) => {
  try {
    const pin = await Pin.findById(req.params.id);
    if (!pin) {
      return res.status(404).json({ message: 'Pin not found' });
    }

    const user = await User.findById(req.userId);
    const saveIndex = user.savedPins.indexOf(pin._id);

    if (saveIndex > -1) {
      user.savedPins.splice(saveIndex, 1);
      pin.saves = Math.max(0, pin.saves - 1);
    } else {
      user.savedPins.push(pin._id);
      pin.saves += 1;
    }

    await user.save();
    await pin.save();

    res.json({
      message: saveIndex > -1 ? 'Pin unsaved' : 'Pin saved',
      savesCount: pin.saves,
      isSaved: saveIndex === -1
    });
  } catch (error) {
    console.error('Toggle save error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add comment
exports.addComment = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || text.trim().length === 0) {
      return res.status(400).json({ message: 'Comment text is required' });
    }

    const pin = await Pin.findById(req.params.id);
    if (!pin) {
      return res.status(404).json({ message: 'Pin not found' });
    }

    pin.comments.push({
      user: req.userId,
      text: text.trim()
    });

    await pin.save();
    await pin.populate('comments.user', 'username avatar');

    res.status(201).json({
      message: 'Comment added successfully',
      comment: pin.comments[pin.comments.length - 1]
    });
  } catch (error) {
    console.error('Add comment error:', error);
    res.status(500).json({ message: 'Server error adding comment' });
  }
};

// Delete comment
exports.deleteComment = async (req, res) => {
  try {
    const { id, commentId } = req.params;

    const pin = await Pin.findById(id);
    if (!pin) {
      return res.status(404).json({ message: 'Pin not found' });
    }

    const comment = pin.comments.id(commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Check if user is the comment author or pin author
    if (comment.user.toString() !== req.userId && pin.author.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to delete this comment' });
    }

    comment.remove();
    await pin.save();

    res.json({
      message: 'Comment deleted successfully',
      commentId
    });
  } catch (error) {
    console.error('Delete comment error:', error);
    res.status(500).json({ message: 'Server error deleting comment' });
  }
};

// Get user's pins
exports.getUserPins = async (req, res) => {
  try {
    const userId = req.params.userId;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const pins = await Pin.find({ author: userId })
      .populate('author', 'username avatar')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Pin.countDocuments({ author: userId });

    res.json({
      pins,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalPins: total
    });
  } catch (error) {
    console.error('Get user pins error:', error);
    res.status(500).json({ message: 'Server error fetching user pins' });
  }
};
