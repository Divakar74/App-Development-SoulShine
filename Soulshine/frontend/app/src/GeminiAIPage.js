import React, { useState } from 'react';
import axios from 'axios';

const GeminiPage = () => {
  const [thoughts, setThoughts] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    await generateAnswer();
  };

  const generateAnswer = async () => {
    try {
      const result = await axios({
        url: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyCzXDlULQQ3BOlCudcV7LNdqusNJSM6hBw',
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          contents: [
            {
              parts: [
                {
                  text: thoughts,
                }
              ]
            }
          ]
        },
      });

      // Adjust this based on the actual API response structure
      const newAnswer = result.data.candidates[0].content.parts[0].text.trim();
      setResponse(newAnswer);
      setThoughts(''); // Clear the input after sending the message
    } catch (error) {
      console.error('Error generating answer:', error);
      setResponse('Sorry, something went wrong. Please try again later.');
    }
  };

  return (
    <div>
      <h1>Gemini Thought Analyzer</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter your thoughts:
          <textarea
            value={thoughts}
            onChange={(e) => setThoughts(e.target.value)}
            rows="5"
            cols="50"
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
      {response && (
        <div>
          <h2>Response from Gemini:</h2>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default GeminiPage;
