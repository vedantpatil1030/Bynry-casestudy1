const Profile = require('../models/Profile');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure storage for profile images
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, `profile-${Date.now()}${path.extname(file.originalname)}`);
  }
});

// File filter to accept only images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload only images.'), false);
  }
};

// Initialize upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5MB max file size
  fileFilter: fileFilter
});

// @desc    Get all profiles
// @route   GET /api/profiles
// @access  Public
const getProfiles = async (req, res) => {
  try {
    const searchQuery = req.query.search;
    let query = {};
    
    if (searchQuery) {
      query = { $text: { $search: searchQuery } };
    }
    
    const profiles = await Profile.find(query);
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single profile
// @route   GET /api/profiles/:id
// @access  Public
const getProfileById = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a profile
// @route   POST /api/profiles
// @access  Private/Admin
const createProfile = async (req, res) => {
  try {
    const profileData = req.body;
    
    // Create profile
    const profile = new Profile(profileData);
    const createdProfile = await profile.save();
    
    res.status(201).json(createdProfile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Upload profile photo
// @route   POST /api/profiles/:id/photo
// @access  Private/Admin
const uploadProfilePhoto = async (req, res) => {
  const uploadSingle = upload.single('photo');
  
  uploadSingle(req, res, async function(err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: `Multer error: ${err.message}` });
    } else if (err) {
      return res.status(400).json({ message: err.message });
    }
    
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a file' });
    }
    
    try {
      const profile = await Profile.findById(req.params.id);
      
      if (!profile) {
        // Remove uploaded file if profile doesn't exist
        fs.unlinkSync(req.file.path);
        return res.status(404).json({ message: 'Profile not found' });
      }
      
      // Delete previous photo if it's not the default
      if (profile.photo !== 'default-profile.jpg' && fs.existsSync(`uploads/${profile.photo}`)) {
        fs.unlinkSync(`uploads/${profile.photo}`);
      }
      
      // Update profile with new photo
      profile.photo = req.file.filename;
      await profile.save();
      
      res.json({ message: 'Photo uploaded successfully', photo: req.file.filename });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
};

// @desc    Update profile
// @route   PUT /api/profiles/:id
// @access  Private/Admin
const updateProfile = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    
    // Update profile with new data
    Object.assign(profile, req.body);
    const updatedProfile = await profile.save();
    
    res.json(updatedProfile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete profile
// @route   DELETE /api/profiles/:id
// @access  Private/Admin
// Update the deleteProfile function
const deleteProfile = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    
    // Delete profile photo if it's not the default
    if (profile.photo !== 'default-profile.jpg') {
      const photoPath = path.join(__dirname, '../uploads', profile.photo);
      if (fs.existsSync(photoPath)) {
        fs.unlinkSync(photoPath);
      }
    }
    
    // Use findByIdAndDelete instead of remove()
    await Profile.findByIdAndDelete(req.params.id);
    
    res.json({ message: 'Profile removed' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProfiles,
  getProfileById,
  createProfile,
  updateProfile,
  deleteProfile,
  uploadProfilePhoto
};