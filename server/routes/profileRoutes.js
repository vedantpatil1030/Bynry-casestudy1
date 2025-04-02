const express = require('express');
const router = express.Router();
const {
  getProfiles,
  getProfileById,
  createProfile,
  updateProfile,
  deleteProfile,
  uploadProfilePhoto
} = require('../controllers/profileController');

// Get all profiles & create new profile
router.route('/')
  .get(getProfiles)
  .post(createProfile);

// Get, update and delete profile by ID
router.route('/:id')
  .get(getProfileById)
  .put(updateProfile)
  .delete(deleteProfile);

// Upload profile photo
router.route('/:id/photo')
  .post(uploadProfilePhoto);

module.exports = router;