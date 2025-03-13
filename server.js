const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(express.static(path.join(__dirname)));
app.use(cors());
app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'funsies.html'));
  });

mongoose.connect('mongodb://localhost:27017/suggestionBox');
  
  const suggestionSchema = new mongoose.Schema({
    name: String,
    comment: String,
  });
  
  const Suggestion = mongoose.model('Suggestion', suggestionSchema);
  
  app.post('/api/suggestions', async (req, res) => {
    try {
        const { name, comment } = req.body;
    const newSuggestion = new Suggestion({ name, comment });
    await newSuggestion.save();
    res.status(201).json({ message: 'Suggestion saved successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while saving the suggestion.' });
  }
});

app.get('/api/suggestions', async (req, res) => {
  try {
    const suggestions = await Suggestion.find();
    res.status(200).json(suggestions);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching suggestions.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// MongoDB Schema for storing quiz results
const quizResultSchema = new mongoose.Schema({
  name: String,
  answers: [String],
  score: Number,
  date: { type: Date, default: Date.now }
});

const QuizResult = mongoose.model('QuizResult', quizResultSchema);

// API route to submit quiz results
app.post('/submit-quiz', async (req, res) => {
  try {
    const { name, answers, score } = req.body;
    
    const newQuizResult = new QuizResult({ name, answers, score });
    await newQuizResult.save();
    
    res.status(201).json({ message: 'Quiz result saved successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Error saving quiz result' });
  }
});

