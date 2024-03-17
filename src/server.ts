import dotenv from "dotenv";  
import http from "http";
import app from "./app";  
import { Server } from "socket.io";
import { ObjectID, Cursor, ObjectId } from 'mongodb';

import express from "express";
import bodyParser from 'body-parser'; 
import HomeController from "./home/controller";
import CommonDao from "./common/common.dao";

import { Mongo,mongoClient,db } from "./configuration/database";  
import SchedulerCL from './configuration/scheduler';
import Logger from "./server-logs/logger";
dotenv.config();  
//const expApp = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 

var server = http.createServer(app);

const database: Mongo = new Mongo();  
const PORT: string | number = process.env.PORT || 3000; 

process.env.TZ = "UTC"; 

 server.listen(PORT, () => {
  console.log("time zone --> ",Intl.DateTimeFormat().resolvedOptions().timeZone );
  console.log("Server runs at port --> ", PORT);
});