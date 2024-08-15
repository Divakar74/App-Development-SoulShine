import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChatBubbleOutlineTwoToneIcon from '@mui/icons-material/ChatBubbleOutlineTwoTone';
import { TextField } from '@mui/material';

const Chat = () => {
  const [question, setQuestions] = useState("");
  const [answer, setAnswers] = useState("");
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [location, setLocation] = useState({ latitude: null, longitude: null });

  useEffect(() => {
    const askForLocationPermission = async () => {
      try {
        await navigator.permissions.query({ name: 'geolocation' });
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude });
          },
          (error) => {
            console.error("Error accessing location:", error);
          }
        );
      } catch (error) {
        console.error("Permission denied or error accessing location:", error);
      }
    };

    askForLocationPermission();
  }, []);

  async function generateAnswer() {
    try {
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyBAft3xwBRPR-wS50bEorIOOxGJUyzZDgw`,
        method: "post",
        data: {
          contents: [
            {
              parts: [
                {
                  text: `${question} in single string chat without comments`
                }
              ]
            }
          ],
          location: {
            latitude: location.latitude,
            longitude: location.longitude
          }
        }
      });

      const newAnswer = response.data.candidates[0].content.parts[0].text;
      setMessages([...messages, { question, answer: newAnswer }]);
      setAnswers(newAnswer);
      setQuestions(""); // Clear the input after sending the message
    } catch (error) {
      console.error("Error generating answer:", error);
    }
  }

  const toggleChatVisibility = () => {
    setIsChatVisible(!isChatVisible);
  };

  return (
    <div>
      <button
        onClick={toggleChatVisibility}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          padding: '20px',
          borderRadius: '100%',
          backgroundColor: '#5F9EA0',
          color: 'white',
          border: 'none',
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
          cursor: 'pointer',
          fontSize: '20px',
          animation: 'bounce 2s infinite'
        }}
      >
        <ChatBubbleOutlineTwoToneIcon />
      </button>

      {isChatVisible && (
        <div
          className="chat-container"
          style={{
            position: 'fixed',
            bottom: '80px',
            right: '20px',
            width: '350px',
            height: '450px',
            backgroundColor: 'floralwhite',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            borderRadius: '10px',
            padding: '20px',
            zIndex: '1000px',
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'scroll',
            animation: 'popOut 0.5s ease-out',
            border: '2px solid #5F9EA0' // Added border here
          }}
        >
          <h2 style={{ margin: '0 0 10px 0', fontSize: '18px', textAlign: 'center' }}>Chat Box</h2>
          <div style={{ flexGrow: 1, marginBottom: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {messages.map((msg, index) => (
              <div key={index} style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{
                  alignSelf: 'flex-end',
                  padding: '10px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  borderRadius: '10px',
                  marginBottom: '5px',
                  maxWidth: '70%',
                }}>
                  {msg.question}
                </div>
                <div style={{
                  alignSelf: 'flex-start',
                  padding: '10px',
                  backgroundColor: '#f1f1f1',
                  borderRadius: '10px',
                  maxWidth: '70%',
                }}>
                  {msg.answer}
                </div>
              </div>
            ))}
          </div>
          <TextField
            value={question}
            onChange={(e) => setQuestions(e.target.value)}
            placeholder="Type your question here..."
            variant="outlined"
            fullWidth
            multiline
            rows={2}
            sx={{
              width: '98%',
              padding: '0px',
              fontSize: '14px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              marginBottom: '10px',
            }}
          />
          <button
            onClick={generateAnswer}
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#5F9EA0',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Send
          </button>
        </div>
      )}
    </div>
  );
};

export default Chat;
