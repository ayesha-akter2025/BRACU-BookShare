require('dotenv').config();
console.log('dotenv loaded');


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
const otpRoutes = require('./routes/otpRoutes'); 
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(
  'mongodb+srv://ayeshaakter3:Hell2025%3F%3F%21%21@bracu-bookshare.wkc2nct.mongodb.net/bracu-bookshare?retryWrites=true&w=majority&appName=BRACU-BookShare'
)
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/otp', otpRoutes); 
app.use('/api/auth', authRoutes); 

// Test route
app.get('/', (req, res) => {
  res.send('Server is running');
});

app.listen(5000, () => console.log('Server started on port 5000'));
