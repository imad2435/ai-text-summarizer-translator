const fs = require('fs');
const path = require('path');

try {
  const envFilePath = path.resolve(__dirname, './.env');
  const envFileContent = fs.readFileSync(envFilePath, { encoding: 'utf8' });
  const [key, value] = envFileContent.split('=');
  if (key && value) {
    process.env[key.trim()] = value.trim();
    console.log(`SUCCESS: Manually loaded environment variable: ${key.trim()}`);
  } else {
    console.error('ERROR: .env file is not in the correct KEY=VALUE format.');
  }
} catch (err) {
  console.error('CRITICAL ERROR: Could not read the .env file.', err);
}
const express = require('express');
const summarizeText = require('./services/summarize');
const translateText = require('./services/translate');
const cors = require('cors');

const app = express();
app.use(cors());
const PORT = 3000;

app.use(express.json());

// Routes
// 1. API ENDPOINT to summarize the text
app.post('/summarize', async(req, res) => {
    // console.log(req.body)
    const summarizedText = await summarizeText(req.body.inputs);
    res.send(JSON.stringify(summarizedText));
})

// 2. API ENDPOINT to translate the summarized text to the selected language
app.post('/translate', async(req, res) => {
    const { text, source, target } = req.body;
    const translatedText = await translateText(text, source, target)    
    res.send(translatedText);
})

app.listen(PORT, () => {
    console.log("App is listening on the port", PORT)
})