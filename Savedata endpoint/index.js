const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

// Set up the storage configuration for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'files'); // Specify the folder where files will be stored
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}_${file.originalname}`;
    cb(null, fileName); // Set the file name for storage
  },
});

// Set up multer middleware
const upload = multer({ storage });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Endpoint to handle form submission and file upload
app.post('/savedata', upload.single('userimage'), (req, res) => {
  const { name, username } = req.body;

  console.log('Name:', name);
  console.log('Username:', username);

  // Check if a file was uploaded
  if (req.file) {
    console.log('File:', req.file.filename);
  }

  res.send('Data received');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


//Remember to create a folder named "files" in the same directory as your server file to store the uploaded files.