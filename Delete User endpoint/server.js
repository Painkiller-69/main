const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Connect to MongoDB
//Make sure to replace 'mongodb://localhost/mydatabase' with your actual MongoDB connection string.
mongoose.connect('mongodb://localhost/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

// Define a User schema
const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  email: String,
  password: String,
});

//Remember to replace 'User' with the actual name of your user collection in the MongoDB database.

// Create a User model
const User = mongoose.model('User', userSchema);

// Endpoint to delete a user by ID
app.get('/delete', async (req, res) => {
  const { id } = req.query;

  if (!id) {
    res.status(400).send('No user ID provided');
    return;
  }

  try {
    // Find the user by ID and delete
    const deletedUser = await User.findByIdAndDelete(id);
    
    if (!deletedUser) {
      res.status(404).send('User not found');
      return;
    }

    res.send('User deleted successfully');
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
