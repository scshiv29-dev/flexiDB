
import { Request, Response } from 'express';
import DBModel, { DB } from './model';

// Create a new DB record
export const createDB = async (req: Request, res: Response): Promise<void> => {
  try {
    const newDB: DB = req.body; // Assuming the request body contains the DB data
    const createdDB = await DBModel.create(newDB);
    res.status(201).json(createdDB);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// Get all DB records
export const getAllDBs = async (_req: Request, res: Response): Promise<void> => {
  try {
    const allDBs = await DBModel.find();
    res.status(200).json(allDBs);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// Get a specific DB record by ID
export const getDBById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const db = await DBModel.findById(id);
    if (!db) {
      res.status(404).send('DB not found');
      return;
    }
    res.status(200).json(db);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// Update a DB record by ID
export const updateDBById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const updatedDB: DB = req.body;
  try {
    const db = await DBModel.findByIdAndUpdate(id, updatedDB, { new: true });
    if (!db) {
      res.status(404).send('DB not found');
      return;
    }
    res.status(200).json(db);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// Delete a DB record by ID
export const deleteDBById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const deletedDB = await DBModel.findByIdAndDelete(id);
    if (!deletedDB) {
      res.status(404).send('DB not found');
      return;
    }
    res.status(200).json(deletedDB);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};
