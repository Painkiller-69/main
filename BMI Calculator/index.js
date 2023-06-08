const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Connect to MongoDB Atlas
mongoose.connect('YOUR_MONGODB_CONNECTION_STRING', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

//Remember to replace 'YOUR_MONGODB_CONNECTION_STRING' in the code with your actual MongoDB Atlas connection string
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });

// Define User and BMI schemas
const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  email: { type: String, unique: true },
  password: String,
});

const bmiSchema = new mongoose.Schema({
  email: String,
  weight: Number,
  height: Number,
  bmi: Number,
  bmivalue: String,
});

const User = mongoose.model('User', userSchema);
const BMI = mongoose.model('BMI', bmiSchema);

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Task 1: Login and Signup pages
app.get('/', (req, res) => {
  res.render('index');
});

app.post('/signup', async (req, res) => {
  const { name, age, gender, email, password } = req.body;

  try {
    await User.create({ name, age, gender, email, password });
    res.redirect('/dashboard');
  } catch (error) {
    res.send('Error creating user');
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password });
    if (user) {
      res.redirect('/dashboard');
    } else {
      res.send('Invalid email or password');
    }
  } catch (error) {
    res.send('Error logging in');
  }
});

// Task 2: Ensure unique users per Email

// Task 3: Dashboard page with BMI calculator link
app.get('/dashboard', (req, res) => {
  res.render('dashboard');
});

// Task 4: Display BMI values if available
app.get('/bmi', async (req, res) => {
  const { email } = req.query;

  try {
    const bmi = await BMI.findOne({ email });
    if (bmi) {
      res.render('bmi', { bmi });
    } else {
      res.redirect('/bmiForm');
    }
  } catch (error) {
    res.send('Error retrieving BMI data');
  }
});

// Task 5: Display BMI form and save data
app.get('/bmiForm', (req, res) => {
  res.render('bmiForm');
});

app.post('/savedata', (req, res) => {
  const { email, weight, height, bmi, bmivalue } = req.body;

  // You can save the data to the BMI collection here
  // Ignore the logic for now as mentioned in the task

  res.send('Data received');
});

// Dummy data for testing Task 4
const dummyData = [
  {
    email: 'test1@example.com',
    weight: 70,
    height: 1.75,
    bmi: 22.86,
    bmivalue: 'Normal',
  },
  {
    email: 'test2@example.com',
    weight: 65,
    height: 1.6,
    bmi: 25.39,
    bmivalue: 'Overweight',
  },
];

// Inserting dummy data into BMI collection
async function insertDummyData() {
  try {
    await BMI.insertMany(dummyData);
    console.log('Dummy data inserted');
  } catch (error) {
    console.error('Error inserting dummy data:', error);
  }
}

// Uncomment the line below to insert the dummy data
// insertDummyData();

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
