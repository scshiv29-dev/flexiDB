
import express from 'express';
import {
  createDB,
  getAllDBs,
  getDBById,
  updateDBById,
  deleteDBById,
} from './controller';

const router = express.Router();

// Create a new DB record
router.post('/db', createDB);

// Get all DB records
router.get('/db', getAllDBs);

// Get a specific DB record by ID
router.get('/db/:id', getDBById);

// Update a DB record by ID
router.put('/db/:id', updateDBById);

// Delete a DB record by ID
router.delete('/db/:id', deleteDBById);

export default router;
