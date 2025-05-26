import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  id: {
    type: Number, 
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  tags: [{
    type: String
  }],
  github: {
    type: String
  },
  demo: {
    type: String
  }
}, 
);

export default mongoose.model('Project', projectSchema);
