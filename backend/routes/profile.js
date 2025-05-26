import express from 'express';
import Profile from '../models/Profile.js';

const router = express.Router();

// Get profile data
router.get('/', async (req, res) => {
  try {
    const profile = await Profile.findOne();
    // console.log(profile.skills);

    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add or update profile
router.post('/', async (req, res) => {
  try {
    const existing = await Profile.findOne();
    if (existing) {
      await Profile.deleteMany(); // keeps one profile only
    }
    const profile = new Profile(req.body);
    const saved = await profile.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
