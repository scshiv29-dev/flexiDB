// src/index.ts
import express from 'express';
import mongoose from 'mongoose';

const app = express();
const PORT = 3000;

// Your mongoose connection logic goes here

const MONGODB_URI = 'mongodb://localhost:5001';

mongoose.connect(MONGODB_URI);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
