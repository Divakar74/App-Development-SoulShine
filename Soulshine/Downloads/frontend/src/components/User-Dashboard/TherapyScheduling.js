import React, { useState } from 'react';
import styled from 'styled-components';
import { Modal, Box, Button, TextField, Typography, Rating } from '@mui/material';

const therapists = [
  {
    id: 1,
    name: 'Dr. Dinesh',
    image: 'https://via.placeholder.com/100',
    reviews: 4.5,
  },
  {
    id: 2,
    name: 'Dr.Priya',
    image: 'https://via.placeholder.com/100',
    reviews: 4.0,
  },
  {
    id: 3,
    name: 'Dr.Karthick',
    image: 'https://via.placeholder.com/100',
    reviews: 3.5,
  }
  // Add more therapists as needed
];

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  margin-top:2rem;
`;

const TherapistContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  width: 100%;
  max-width: 600px;
`;

const ProfilePic = styled.img`
  border-radius: 50%;
  margin-right: 1rem;
`;

const InfoContainer = styled.div`
  flex: 1;
`;

const BookingButton = styled(Button)`
  margin-left: auto;
`;

const TherapyScheduling = () => {
  const [open, setOpen] = useState(false);
  const [selectedTherapist, setSelectedTherapist] = useState(null);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [feeling, setFeeling] = useState('');

  const handleOpen = (therapist) => {
    setSelectedTherapist(therapist);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedTherapist(null);
    setDate('');
    setTime('');
    setFeeling('');
  };

  const handleBooking = () => {
    // Implement booking logic here
    console.log('Booking:', { therapist: selectedTherapist, date, time, feeling });
    handleClose();
  };

  return (
    <Container>
      <h1>Therapy Scheduling</h1>
      <p>Schedule and manage therapy sessions with ease.</p>
      {therapists.map((therapist) => (
        <TherapistContainer key={therapist.id}>
          <ProfilePic src={therapist.image} alt={therapist.name} />
          <InfoContainer>
            <Typography variant="h6">{therapist.name}</Typography>
            <Rating value={therapist.reviews} readOnly precision={0.5} />
          </InfoContainer>
          <BookingButton variant="contained" color="primary" onClick={() => handleOpen(therapist)}>
            Book Appointment
          </BookingButton>
        </TherapistContainer>
      ))}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            borderRadius: '12px',
          }}
        >
          <Typography variant="h6" component="h2">
            Book Appointment with {selectedTherapist?.name}
          </Typography>
          <TextField
            label="Date"
            type="date"
            fullWidth
            value={date}
            onChange={(e) => setDate(e.target.value)}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Time"
            type="time"
            fullWidth
            value={time}
            onChange={(e) => setTime(e.target.value)}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Current Feeling"
            multiline
            fullWidth
            rows={4}
            value={feeling}
            onChange={(e) => setFeeling(e.target.value)}
            margin="normal"
          />
          <Button variant="contained" color="primary" onClick={handleBooking}>
            Confirm Booking
          </Button>
        </Box>
      </Modal>
    </Container>
  );
};

export default TherapyScheduling;
