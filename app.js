const { MongoClient } = require('mongodb');
const express = require('express');
const cors = require('cors'); // Require cors package
const nodemailer = require('nodemailer');

// import path from "path";  
// import bodyParser from "body-parser";  
// import cors from "cors";  
// import helmet from "helmet";  
// import morgan from "morgan";  
// import compression from "compression";  

const app = express();
app.use(express.json());
app.use(cors({ credentials: true }));  
// app.use(bodyParser.json({limit: '50mb'}));
// app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

const port = 9000;
const uri = 'mongodb+srv://ssarankumar7196:frfJ99fprWDpwCDZ@quiz.wvalptp.mongodb.net/demo';
// const uri = 'mongodb+srv://thiyaneshoff:0987654321@2024@cluster0.3vyehdq.mongodb.net/quiz'

// const connectionString = 'mongodb://thiyaneshoff:0987654321@2024@cluster0:27017/quiz';

//mongodb+srv://thiyaneshoff:<password>@cluster0.3vyehdq.mongodb.net/
// MongoDB connection URL
// const uri = 'mongodb+srv://admin:vidhyaan2021@vidhyaandb.wcsf8.mongodb.net/live';

// Connect to MongoDB
MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to MongoDB');
    const db = client.db();

	//const db = client.db(dbName);
	const collection = db.collection('quizApplication');
  

	// db.collection('quizApplication').insertOne({ name: 'John Doe', email: 'john.doe@example.com' }, (insertErr, result) => {
    //     if (insertErr) {
    //         console.error('Failed to insert document:', insertErr);
    //         return;
    //     }

    //     console.log('Document inserted successfully:', result.insertedId);
    // });

	// API endpoint to get all documents
	app.get('/api/list', async (req, res) => {
		try {
			console.log("sddsdsds")
		  const data = await collection.find({}).toArray();
		  res.json(data);
		} catch (error) {
		  console.error('Error fetching data:', error);
		  res.status(500).json({ message: 'Internal server error' });
		}
	  });
	
	//   // API endpoint to insert a new document
	  app.post('/api/data', async (req, res) => {
		const newData = req.body;
		console.log("newData",newData)
		try {

			db.collection('quizApplication').insertOne(newData, (insertErr, result) => {
				if (insertErr) {
					console.error('Failed to insert document:', insertErr);
					return;
				}
				// Create a transporter with your email service provider's SMTP settings
			// const transporter = nodemailer.createTransport({
			// 	service: 'Gmail',
			// 	auth: {
			// 	user: 'thiyaneshoff@gmail.com',
			// 	pass: 'Thiyanz123',
			// 	},
			// });
			
			// // Define the email options
			// const mailOptions = {
			// 	from: 'thiyaneshoff@gmail.com',
			// 	to: 's.sarankumar7196@gmail.com',
			// 	subject: 'Hello from Nodemailer',
			// 	text: 'This is a test email sent from Node.js using Nodemailer.',
			// };
			
			// // Send the email
			// transporter.sendMail(mailOptions, (error, info) => {
			// 	console.log("dfdfdf")
			// 	if (error) {
			// 	console.error('Error sending email:', error);
			// 	} else {
			// 	console.log('Email sent:', info.response);
			// 	}
			// });
				res.status(200).json({isSuccess: true,message: 'Saved Successfully' });
				console.log('Document inserted successfully:');
			});
		 
		} catch (error) {
		  console.error('Error inserting data:', error);
		  res.status(500).json({ isSuccess: false,message: 'Internal server error' });
		}
	  });

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });
