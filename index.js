
const twilio = require('twilio');
const ngrok = require('ngrok');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
// gCmT7YAZKYQg1jx4
// gCmT7YAZKYQg1jx4
const uri = process.env.ATLAS_URI;
console.log(uri)
mongoose.connect('mongodb+srv://madhu:gCmT7YAZKYQg1jx4@cluster0.umdma.mongodb.net/piegeon?retryWrites=true&w=majority', { useNewUrlParser: true, useCreateIndex: true,useUnifiedTopology:true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

// const exercisesRouter = require('./routes/exercises');
// const usersRouter = require('./routes/users');
// const messages = require('./routes/message')
// const groups = require('./routes/GroupRoute')

// app.use('/exercises', exercisesRouter);
// app.use('/', usersRouter);
// app.use('/',messages);
// app.use('/',groups);

// app.listen(port, () => {
//     console.log(`Server is running on port: ${port}`);
// });
const AccessToken = twilio.jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;

app.get('/getToken', (req, res) => {
  if (!req.query || !req.query.userName) {
    return res.status(400).send('Username parameter is required');
  }
  const accessToken = new AccessToken(
    process.env.ACCOUNT_SID,
    process.env.API_KEY_SID,
    process.env.API_KEY_SECRET,
  );

  // Set the Identity of this token
  accessToken.identity = req.query.userName;

  // Grant access to Video
  var grant = new VideoGrant();
  accessToken.addGrant(grant);

  // Serialize the token as a JWT
  var jwt = accessToken.toJwt();
  return res.send(jwt);
});
app.listen(process.env.PORT, () =>
  console.log(`Server listening on port ${process.env.PORT}!`),
);

ngrok.connect(process.env.PORT).then((url) => {
  console.log(`Server forwarded to public url ${url}`);
});