const axios = require('axios');
require('dotenv').config();

async function summarizeText(text) {
    try {
      let data = JSON.stringify({
          "inputs": text,
          "parameters": {
            "max_length": 10000,
            "min_length": 30
          }
        });
        
    // --- START: ADD THIS DEBUGGING CODE ---
    const apiToken = process.env.HUGGING_FACE_API_TOKEN;
    console.log("--- DEBUG ---");
    console.log("Is the API Token a string?", typeof apiToken === 'string');
    console.log("API Token Value:", apiToken);
    console.log("-------------");
    // --- END: ADD THIS DEBUGGING CODE ---

    let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://api-inference.huggingface.co/models/sshleifer/distilbart-cnn-12-6', // <-- This line is changed
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${apiToken}`
    },
    data : data
  };

    const response = await axios.request(config);
    return response.data[0].summary_text;
  }
  catch (error) {
    console.log(error.message);
  }
}

module.exports = summarizeText;