import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, TextField, Button } from '@mui/material';
import styled from 'styled-components';
import emailjs from 'emailjs-com'; // Import EmailJS SDK

const ContactUsPage = () => {
  const [feedback, setFeedback] = useState('');
  const [email, setEmail] = useState('');

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Use EmailJS to send feedback email to your email
    emailjs.sendForm('service_v4op3z6', 'template_lntir3a', event.target, 'PZypyuPX33igDJ02W')
      .then((result) => {
          console.log('Feedback Success:', result.text);

          // Send a thank-you email to the user
          emailjs.send(
            'service_v4op3z6', 
            'template_thank_you', // Your thank you email template ID
            {
              to_email: email, // Use user's email address for recipient
              user_feedback: feedback,
              // Additional fields if needed
            },
            'PZypyuPX33igDJ02W' // Your EmailJS user ID
          ).then((thankYouResult) => {
              console.log('Thank You Email Success:', thankYouResult.text);
              alert('Feedback sent successfully and thank you email has been sent to you!');
          }, (thankYouError) => {
              console.log('Thank You Email Error:', thankYouError.text);
              alert('Feedback sent successfully, but failed to send thank you email.');
          });
      }, (error) => {
          console.log('Feedback Error:', error.text);
          alert('Failed to send feedback.');
      });
  };

  return (
    <PageContainer>
      <Card sx={{ maxWidth: 600, width: '100%', borderRadius: '12px', boxShadow: 3 }}>
        <CardContent>
          <Typography
            variant="h4"
            sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'bold', textAlign: 'center' }}
          >
            Contact Us
          </Typography>
          <Typography
            variant="h6"
            sx={{ fontFamily: 'Poppins, sans-serif', textAlign: 'center', mt: 2 }}
          >
            Email: soulshine4u@gmail.com
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ mt: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <TextField
              name="user_email" // Add name attribute to match the template field
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={handleEmailChange}
              sx={{ fontFamily: 'Poppins, sans-serif' }}
            />
            <TextField
              name="user_feedback" // Add name attribute to match the template field
              label="Provide Your Feedback"
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              margin="normal"
              value={feedback}
              onChange={handleFeedbackChange}
              sx={{ fontFamily: 'Poppins, sans-serif' }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2, fontFamily: 'Poppins, sans-serif' }}
            >
              Submit
            </Button>
          </Box>
        </CardContent>
      </Card>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
  padding: 16px;
`;

export default ContactUsPage;
