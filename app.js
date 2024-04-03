const {
	MongoClient
} = require('mongodb');
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
app.use(cors({
	credentials: true
}));
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
MongoClient.connect(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
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
				res.status(500).json({
					message: 'Internal server error'
				});
			}
		});

		//   // API endpoint to insert a new document
		app.post('/api/data', async (req, res) => {
			const newData = req.body;
			console.log("newData", newData)
			try {
				
				// Create a transporter with your email service provider's SMTP settings
				const transporter = nodemailer.createTransport({
					service: 'gmail',
					auth: {
						user: 'quizmailsender001@gmail.com',
						pass: 'spmh jobl icxn kylu',
					},
					secure: true, // Use SSL/TLS
					tls: {
						rejectUnauthorized: false // Avoids issues with self-signed certificates
					}
				});

				let dynamicHTMLContent = `<html
					lang="en"
					xmlns="http://www.w3.org/1999/xhtml"
					xmlns:o="urn:schemas-microsoft-com:office:office"
				  >
					<head>
					  <meta charset="UTF-8" />
					  <meta name="viewport" content="width=device-width,initial-scale=1" />
					  <meta name="x-apple-disable-message-reformatting" />
					  <title></title>
					  
					  <style>
						table,
						td,
						div,
						h1,
						p {
						  font-family: Arial, sans-serif;
						}
					  </style>
					</head>
					<body style="margin: 0; padding: 0">
					  <table
						role="presentation"
						style="
						  width: 100%;
						  border-collapse: collapse;
						  border: 0;
						  border-spacing: 0;
						  background: #ffffff;
						"
					  >
						<tr>
						  <td align="center" style="padding: 0">
							<table
							  role="presentation"
							  style="
								width: 602px;
								border-collapse: collapse;
								border: 1px solid #cccccc;
								border-spacing: 0;
								text-align: left;
							  "
							>
							  <tr>
								<td
								  align="left"
								  style="padding: 0.5rem 1rem; background: #2954a2"
								>
								  <img
									src="../assets/img/logo_vidhyaan.svg"
									alt=""
									width="100"
									style="height: auto; display: block"
								  />
								</td>
							  </tr>
							  <tr>
								<td align="center" style="padding: 0.5rem 1rem">
								  <img
									src="../assets/img/emailIcn.png"
									alt=""
									width="70"
									style="height: auto; display: block"
								  />
								  <h1 style="font-size: 26px">Quiz Submitted </h1>
								  <hr style="border: 0; border-bottom: 1px solid #cccccc" />
								</td>
							  </tr>
							  <tr>
								<td style="padding: 22px 30px 42px 30px">
								  <table
									role="presentation"
									style="
									  width: 100%;
									  border-collapse: collapse;
									  border: 0;
									  border-spacing: 0;
									"
								  >
									<tr>
									  <td style="padding: 0 0 36px 0; color: #153643">
										<h1
										  style="
											font-size: 16px;
											margin: 0 0 20px 0;
											font-family: Arial, sans-serif;
										  "
										>
										Hi ${newData.name} ,
										</h1>
									   
										 <p style="font-size: 16px;line-height: 24px;font-family: Arial, sans-serif;">
										  <span style="font-weight: bold;">Correct Answer</span>: ${newData.correctAnswer}
										 </p>
										 <p style="font-size: 16px;line-height: 24px;font-family: Arial, sans-serif;">
										  <span style="font-weight: bold;">In-Correct Answer</span>: ${newData.inCorrectAnswer}
										 </p>
										 <p style="font-size: 16px;line-height: 24px;font-family: Arial, sans-serif;">
										  <span style="font-weight: bold;">Not Answered</span>: ${newData.notAnswered}
										 </p>
										
									   
										<p
										  style="
											margin: 45px 0 12px 0;
											font-size: 16px;
											line-height: 24px;
											font-family: Arial, sans-serif;
										  "
										>
										Thanks
										<br />
									   
										</p>
									  </td>
									</tr>
								  </table>
								</td>
							  </tr>
							 
							</table>
						  </td>
						</tr>
					  </table>
					</body>
				  </html>`;

				// Define the email options
				const mailOptions = {
					from: 'quizmailsender001@gmail.com',
					to: ['ranjithraja2696@gmail.com','thiyaneshoff@gmail.com'],
					subject: 'Quiz Result',
					html: dynamicHTMLContent
				};

				// Send the email
				transporter.sendMail(mailOptions, (error, info) => {
					console.log("dfdfdf")
					if (error) {
						console.error('Error sending email:', error);
					} else {
						console.log('Email sent:', info.response);
					}
				});

				await db.collection('quizApplication').insertOne(newData, (insertErr, result) => {
					if (insertErr) {
						console.error('Failed to insert document:', insertErr);
						return;
					}
					console.log("result", result)

					res.status(200).json({
						isSuccess: true,
						message: 'Saved Successfully'
					});
					console.log('Document inserted successfully:');
				});

			} catch (error) {
				console.error('Error inserting data:', error);
				res.status(500).json({
					isSuccess: false,
					message: 'Internal server error'
				});
			}
		});

		app.listen(port, () => {
			console.log(`Server is running on http://localhost:${port}`);
		});
	})
	.catch(err => {
		console.error('Error connecting to MongoDB:', err);
	});