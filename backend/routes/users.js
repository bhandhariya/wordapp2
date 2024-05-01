var express = require('express');
var router = express.Router();
const axios = require('axios');
const Word = require('../model/word.model')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.post('/createWords', async function(req, res, next) {
  try {
    // Fetch the dictionary data from GitHub
    const response = await axios.get('https://raw.githubusercontent.com/matthewreagan/WebstersEnglishDictionary/master/dictionary.json');
    const dictionary = response.data;
    
    // Convert dictionary object into an array of objects for bulk insertion
    const wordEntries = Object.keys(dictionary).map(key => {
      console.log(key,'key');
      return { word: key, definition: dictionary[key] };
    });

    // Insert all entries into MongoDB
    await Word.insertMany(wordEntries);

    // Send a success response
    res.status(200).send({ message: 'Words successfully added to the database!', count: wordEntries.length });
  } catch (error) {
    // Handle possible errors
    console.error('Error while creating words:', error);
    res.status(500).send({ message: 'Failed to add words to the database', error: error.message });
  }
});

router.get('/searchWord', async function(req, res) {
  // Get the word from the query string
  const wordToSearch = req.query.word;

  if (!wordToSearch) {
    return res.status(400).send({ message: "No word provided for search." });
  }

  try {
    // Search for the word in the database
    const result = await Word.findOne({ word: wordToSearch });

    if (result) {
      // If the word is found, return the word and its definition
      res.status(200).send(result);
    } else {
      // If the word is not found, inform the user
      res.status(404).send({ message: "Word not found" });
    }
  } catch (error) {
    // Handle possible errors
    console.error('Error while searching for the word:', error);
    res.status(500).send({ message: 'Error searching for the word', error: error.message });
  }
});


module.exports = router;
