import mongoose from 'mongoose';

const educationSchema = new mongoose.Schema({
  degree: String,
  institution: String,
  from: String,
  to: String,
  cgpa: String
});

const skillSchema = new mongoose.Schema({
  type: String,
  items: [String],
});

const whatIDoSchema = new mongoose.Schema({
  title: String,
  description: String
});

const profileSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  github: String,
  objective: String,
  aboutme: String,
  education: [educationSchema],
  skills: [skillSchema],
  whatIDo: [whatIDoSchema],
  profileImage: String
}, {
  timestamps: true
});

export default mongoose.model('Profile', profileSchema);