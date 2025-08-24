const express=require('express');
const mongoose= require('mongoose');
require('dotenv').config();
const DB_URL = process.env.MONGO_URI;
const PORT=5000;

const app=express();

//Middleware
app.use("/",(req,res,next)=>{
  console.log("Request received");
  next();
})

mongoose.connect(DB_URL)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

