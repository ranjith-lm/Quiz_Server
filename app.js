const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const port = 4000;
const mongoUrl = 'mongodb+srv://thiyaneshoff:UAiwQGQmrZRJTchD@cluster0.3vyehdq.mongodb.net/quiz';
const dbName = 'quiz';
const collectionName = 'quiz_results';

// Middleware for JSON parsing
app.use(express.json());

// app.listen(port, () => {
// 	//console.log(db);
//     console.log(`Server is running on http://localhost:${port}`);
//   });

// Connect to MongoDB
MongoClient.connect(mongoUrl, (err, client) => {
  if (err) {
    console.error('Error connecting to MongoDB:', err);
    return;
  }
  console.log('Connected to MongoDB successfully');

  const db = client.db(dbName);
  const collection = db.collection(collectionName);

  // API endpoint to get all documents
  app.get('/api/data', async (req, res) => {
    try {
      const data = await collection.find({}).toArray();
      res.json(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // API endpoint to insert a new document
  app.post('/api/data', async (req, res) => {
    const newData = req.body;
    try {
      const result = await collection.insertOne(newData);
      res.status(201).json(result.ops[0]);
    } catch (error) {
      console.error('Error inserting data:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // Start the server
  app.listen(port, () => {
	console.log(db);
    console.log(`Server is running on http://localhost:${port}`);
  });
});