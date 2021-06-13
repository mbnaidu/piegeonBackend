const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
// gCmT7YAZKYQg1jx4
const uri = process.env.ATLAS_URI;

mongoose.connect('mongodb+srv://madhu:gCmT7YAZKYQg1jx4@cluster0.umdma.mongodb.net/piegeon?retryWrites=true&w=majority', { useNewUrlParser: true, useCreateIndex: true,useUnifiedTopology:true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');
const messages = require('./routes/message')

app.use('/exercises', exercisesRouter);
app.use('/', usersRouter);
app.use('/',messages);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
