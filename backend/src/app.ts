import express, { Express, Request, Response } from 'express';
import { MongoClient } from 'mongodb';
import 'dotenv/config';
import bodyParser from 'body-parser';
import AppRouter from './routes';

import cors from 'cors';
import { initDB } from './controllers/user.controller';

const port = 3030;
const app: Express = express();
const router = new AppRouter(app);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const uri = process.env.MONGO_URI || ''; // Get the URI from the .env file
const client = new MongoClient(uri);

// Connect to MongoDB
async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to MongoDB successfully');

    // Get your database if needed
    const db = client.db('TeachinderDB'); // Replace 'myDatabase' with your actual DB name
    initDB(db);
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1); // Exit if connection fails
  }
}

router.init();

// Start the server after database connection is established
app.listen(port, async () => {
  await connectToDatabase(); // Connect to the DB before starting the app
  console.log(`Now listening on port ${port}`);
});
