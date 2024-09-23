import { Request, Response } from 'express';
import { MongoClient, Db, ObjectId } from 'mongodb';

// You should import the connected MongoDB client and database here,
// or pass it as a parameter to this controller if needed.
let db: Db;

// Initialize the database connection here (or in your app startup)
export const initDB = (database: Db) => {
  db = database;
};

// Controller to get users
export const getUsers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const users = await db.collection('users').find().toArray();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching users' });
  }
};

// Controller to create a new user
export const postUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const newUser = req.body;
    const result = await db.collection('users').insertOne(newUser);
    res
      .status(201)
      .json({ message: 'User created', userId: result.insertedId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating user' });
  }
};

// Controller to update favorite status of a user
export const makeFavorite = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId, favorite } = req.body;
    const result = await db
      .collection('users')
      .updateOne({ _id: new ObjectId(userId) }, { $set: { favorite } });
    if (result.modifiedCount === 1) {
      res.status(200).json({ message: 'User favorite status updated' });
    } else {
      res.status(404).json({ message: 'User not found with id: ' + userId });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating favorite status' });
  }
};
