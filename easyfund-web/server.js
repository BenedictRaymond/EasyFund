import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';
import { connectToDatabase, getStartupData } from './src/server/db.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',  // your MySQL username
  password: 'root',  // update this to your MySQL password
  database: 'easyfund',
  port: 3306,
  // Add these options for better error handling
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Improve error handling for MySQL connection
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    // Don't exit the process, just log the error
    return;
  }
  console.log('Connected to MySQL database');
});

// Add error handler for the connection
db.on('error', (err) => {
  console.error('MySQL database error:', err);
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    console.log('Database connection was closed. Attempting to reconnect...');
    db.connect();
  } else {
    throw err;
  }
});

// Connect to MongoDB when server starts
connectToDatabase()
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// API endpoint to get startup data
app.get('/api/startups', async (req, res) => {
  try {
    const data = await getStartupData();
    console.log('Data fetched successfully:', data.length, 'records');
    res.json(data);
  } catch (error) {
    console.error('Detailed error:', error);
    res.status(500).json({ 
      error: 'Error fetching startup data',
      details: error.message 
    });
  }
});

app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app; 