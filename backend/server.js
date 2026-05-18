// const express = require('express');
// const dotenv = require('dotenv');
// const cors = require('cors');

// const connectDB = require('./config/db');

// dotenv.config();

// connectDB();

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.get('/', (req, res) => {
//   res.send('Backend Running Successfully');
// });

// app.use('/api/auth', require('./routes/authRoutes'));
// app.use('/api/resume', require('./routes/resumeRoutes'));

// module.exports = app;
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const connectDB = require('./config/db');

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend Running Successfully');
});

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/resume', require('./routes/resumeRoutes'));

module.exports = app;