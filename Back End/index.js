/**
 * Programmer: Raden Fadhil Anugerah Ardiwilaga
 * Filename: 17 June 2023
 * Contact: fadhilanugrah21@upi.edu
 * Date: server.js
 * Description: This is the code for running the servers
 * */

import express from 'express';
import * as dotenv from 'dotenv';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import userRouter from './src/routes/user.routes.js';
import authRouter from './src/routes/auth.routes.js';

// get env from .env file
dotenv.config();
const init = () => {
  // setting up the server
  const server = express();
  server.use(cookieParser());
  server.use(cors({ credentials: true, origin: 'http://localhost:5173' }));
  server.use(bodyParser.json({ limit: '10mb', extended: true }));
  server.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

  // register the routes
  server.use('/users', userRouter);
  server.use('/auth', authRouter);
  // get port from .env
  const PORT = process.env.PORT || 5000;
  // start the server
  mongoose.set('strictQuery', true);
  mongoose
    .connect(process.env.MONGOOSE_CONNECT_URL)
    .then(() => server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`)))
    .catch((error) => console.log(error.message));
};

init();
