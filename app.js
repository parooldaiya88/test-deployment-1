import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import User from './models/User.js';
//APP INIT
const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
//ROUTES
app.get('/',(req,res)=>{
  res.send(`<h1>We just deployed out backend!</h1>`)
})
app.get('/users',async (req, res, next) => {
  try {
    console.log(req.query);
    const users = await User.find(req.query);
    if (users.length > 0) res.status(200).json(users);
    else throw createError.NotFound('no users found');
  } catch (e) {
    next(e);
  }
})
app.post('/users',
async (req, res, next) => {
  console.log(req);
  try {
    const user = await User.create(req.body);
    res.status(200).json({
      submittedUSer: user,
      message: 'user was added to the database',
    });
  } catch (e) {
    next(e);
  }
})
//START LISTENING ON PORT
const port = process.env.PORT || 5050;
app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
 //CONNECT TO MONGO_DB
mongoose.connect(process.env.DB_URI);
mongoose.connection.on('error', console.error).on('open', () => {
  console.log('Connected to DB');
});