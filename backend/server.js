import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import projectRoutes from './routes/projects.js';
import profileRoutes from './routes/profile.js';
import connectDB from './db.js';

dotenv.config();

connectDB();


const app = express();
const PORT = process.env.PORT || 8000;



// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.use('/api/profile', profileRoutes);
app.use('/api/projects', projectRoutes);


// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;