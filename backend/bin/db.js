// Import the mongoose module
const mongoose = require('mongoose');

// Connection URL
const url = 'mongodb://localhost:27017/wordsdb1';

// Connect to MongoDB using Mongoose
mongoose.connect(url, { })
  .then(() => console.log('MongoDB connection successful'))
  .catch(err => console.error('MongoDB connection error:', err));

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        console.log('Mongoose connection disconnected due to application termination');
        process.exit(0);
    });
});
