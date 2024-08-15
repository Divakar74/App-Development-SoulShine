import React, { useState } from 'react';
import axios from 'axios';

const NewsletterGenerator = () => {
  const [newsletter, setNewsletter] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateNewsletter = async () => {
    setLoading(true);
    setError(null);

    try {
      // Make a request to your Spring Boot backend endpoint
      const response = await axios.post(
        'http://localhost:8080/mood-entries/newsletter', // Update this URL to match your backend endpoint
        {
          // You can include any necessary request body if needed, here it's empty
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      // Assuming the response from backend is the news article text
      setNewsletter(response.data); 
    } catch (error) {
      setError('Failed to generate newsletter. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>AI-Generated Mental Health Newsletter</h2>
      <button onClick={generateNewsletter} disabled={loading}>
        {loading ? 'Generating...' : 'Generate Newsletter'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {newsletter && (
        <div>
          <h3>Newsletter:</h3>
          <p>{newsletter}</p>
        </div>
      )}
    </div>
  );
};

export default NewsletterGenerator;
