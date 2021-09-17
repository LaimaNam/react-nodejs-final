import express, { application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express(); // serveris
dotenv.config();
const PORT = process.env.PORT;

import User from './models/UserModel.js';

//Connecting mongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then((response) => {
    console.log('Mongo db connected');
    //Starting server
    app.listen(PORT, () => {
      console.log(`Server is running on ${PORT}...`);
    });
  })
  .catch((err) => console.log(err));

//Middlewares
app.use(cors());
app.use(express.json());

//Routes
//test route
app.get('/', (req, res) => {
  res.send('API is running');
});

//GET all users
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

//ADD user
app.post('/api/users', async (req, res) => {
  const user = req.body;
  const newUser = new User(user);

  try {
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

//UPDATE user
app.put('/api/users/:id', async (req, res) => {
  const id = req.params.id;
  const userToUpdate = req.body;

  try {
    await User.findByIdAndUpdate(id, userToUpdate);
    res.send('Successfully Updated');
  } catch (error) {
    res.json({ message: error.message });
  }
});

//DELETE user
app.delete('/api/users/:id', async (req, res) => {
  const id = req.params.id;

  try {
    await User.findByIdAndRemove(id).exec();
    res.send('Successfully Deleted');
  } catch (error) {
    res.json({ message: error.message });
  }
});
