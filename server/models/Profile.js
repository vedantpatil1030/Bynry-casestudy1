const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true
  },
  photo: {
    type: String,
    default: 'default-profile.jpg'
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
    trim: true
  },
  location: {
    lat: {
      type: Number,
      required: [true, 'Latitude is required']
    },
    lng: {
      type: Number,
      required: [true, 'Longitude is required']
    }
  },
  contactInfo: {
    email: String,
    phone: String
  },
  interests: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Create index for better search performance
profileSchema.index({ name: 'text', address: 'text', description: 'text' });

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;