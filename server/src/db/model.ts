
import mongoose, { Document, Schema } from 'mongoose';

// Define the EnvVariable interface
export interface EnvVariable {
  key: string;
  value: string;
}

// Define the DB interface
export interface DB {
  name: string;
  type: string;
  tag: string;
  env: EnvVariable[];
  PORT: number;
}

// Define the Mongoose schema for DB
const dbSchema = new Schema<DB & Document>({
  name: { type: String, required: true },
  type: { type: String, required: true },
  tag: { type: String, required: true },
  env: [
    {
      key: { type: String, required: true },
      value: { type: String, required: true },
    },
  ],
  PORT: { type: Number, required: true },
});

// Create a Mongoose model for DB
const dbModel = mongoose.model<DB & Document>('DB', dbSchema);

export default dbModel;
