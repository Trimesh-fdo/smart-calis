const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth',    require('./routes/auth'));
app.use('/api/user',    require('./routes/user'));
app.use('/api/workout', require('./routes/workout'));
app.use('/api/weight',  require('./routes/weight'));
app.use('/api/meal',    require('./routes/meal'));
app.use('/api/predict', require('./routes/predict'));
app.use('/api/chatbot', require('./routes/chatbot'));

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT || 5000, () =>
      console.log(`Server running on port ${process.env.PORT || 5000}`)
    );
  })
  .catch(err => console.error('DB Error:', err));
