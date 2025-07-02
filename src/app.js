//Direct Mongoose connection

const mongoose = require('mongoose');
const express = require('Express');
const app = express();
require('dotenv').config(); 

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/opencart';

// Middleware
app.use(express.json());



// handling db connection formongo
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Basic route shows if backend is live
app.get('/', (req, res) => {
  res.send('OpenCart Backend is lie!!!!');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
