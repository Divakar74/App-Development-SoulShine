import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Paper, Typography, Avatar, Box, Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import CloseIcon from '@mui/icons-material/Close';

const ChatContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '60vh',
  maxWidth: '600px',
  margin: 'auto',
}));

const ChatBox = styled(Paper)(({ theme }) => ({
  flex: 1,
  padding: '10px',
  marginBottom: '10px',
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '10px',
}));

const ChatEntry = styled(Box)(({ theme, type }) => ({
  alignSelf: type === 'user' ? 'flex-end' : 'flex-start',
  marginBottom: '10px',
  padding: '10px',
  borderRadius: '10px',
  backgroundColor: type === 'user' ? '#d0f5a9' : '#f1f1f1',
  maxWidth: '75%',
  display: 'flex',
  alignItems: 'center',
  '& > p': {
    margin: 0,
  },
}));

const UserAvatar = styled(Avatar)(({ theme }) => ({
  marginRight: '10px',
}));

const InputContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
}));

const ChatPage = ({ open, onClose }) => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  const handleSend = async () => {
    if (message.trim() === '') return;

    const newChat = [...chat, { type: 'user', text: message }];
    setChat(newChat);
    setMessage('');

    try {
      const response = await axios.post('http://localhost:5000/predict', { message });
      setChat([...newChat, { type: 'bot', text: response.data.response, emoji: '😊' }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setChat([...newChat, { type: 'bot', text: 'Error communicating with the server.', emoji: '😞' }]);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>
        Chat with Therapist
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          aria-label="close"
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <ChatContainer>
          <ChatBox>
            {chat.map((entry, index) => (
              <ChatEntry key={index} type={entry.type}>
                {entry.type === 'user' ? (
                  <UserAvatar src="https://img.freepik.com/free-vector/isolated-young-handsome-man-set-different-poses-white-background-illustration_632498-649.jpg?t=st=1721989106~exp=1721992706~hmac=45d8735abe88fb6f177c70ae3a0f94b42a0b9761461cb18b44f1219c31ac0de5&w=740" />
                ) : (
                  <SentimentSatisfiedIcon style={{ marginRight: '10px' }} />
                )}
                <Typography variant="body1">
                  {entry.text} {entry.emoji && <span>{entry.emoji}</span>}
                </Typography>
              </ChatEntry>
            ))}
          </ChatBox>
          <InputContainer>
            <TextField
              fullWidth
              variant="outlined"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type a message..."
              multiline
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSend}
            >
              Send
            </Button>
          </InputContainer>
        </ChatContainer>
      </DialogContent>
    </Dialog>
  );
};

export default ChatPage;
