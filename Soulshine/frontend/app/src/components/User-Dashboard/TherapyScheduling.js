import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Modal, Box, Button, TextField, Typography, Rating, MenuItem, Select } from '@mui/material';
import Payment from '../Payment';
import { Axios } from 'axios';
import axios from 'axios';
const therapists = [
  // Your existing therapists list
  {
    id: 1,
    name: 'Dr. Dinesh',
    image: 'https://via.placeholder.com/100',
    reviews: 4.5,
    notes: 'Specializes in cognitive behavioral therapy and stress management.',
    availableTimes: ['10:00 AM', '11:00 AM', '2:00 PM', '4:00 PM']
  },
  {
    id: 2,
    name: 'Dr. Priya',
    image: 'https://via.placeholder.com/100',
    reviews: 4.0,
    notes: 'Expert in relationship counseling and anxiety disorders.',
    availableTimes: ['9:00 AM', '1:00 PM', '3:00 PM']
  },
  {
    id: 3,
    name: 'Dr. Karthick',
    image: 'https://via.placeholder.com/100',
    reviews: 3.5,
    notes: 'Experienced in adolescent therapy and mood disorders.',
    availableTimes: ['11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM']
  },
  {
    id: 4,
    name: 'Dr. Karunya',
    image: 'https://via.placeholder.com/100',
    reviews: 4.8,
    notes: 'Specializes in trauma recovery and mindfulness-based therapy.',
    availableTimes: ['8:00 AM', '10:00 AM', '12:00 PM', '3:00 PM']
  },
  {
    id: 5,
    name: 'Dr. Deepak',
    image: 'https://via.placeholder.com/100',
    reviews: 4.3,
    notes: 'Expert in family therapy and anger management.',
    availableTimes: ['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM']
  }
];

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  margin-top: 2rem;
  font-family: 'Poppins', sans-serif;
`;

const TherapistContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 16px;
  box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
  width: 100%;
  max-width: 900px;
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
  border-radius: 25px;
`;

const BenefitsSection = styled.div`
  margin: 3rem 0;
  padding: 2rem;
  border-radius: 15px;
  background-color: #ffffff;
  width: 100%;
  max-width: 900px;
  text-align: center;
`;

const TimeSlotSelect = styled(Select)`
  margin-top: 1rem;
  width: 100%;
`;

const AppointmentsSection = styled.div`
  margin: 2rem 0;
  padding: 1rem;
  border-radius: 12px;
  background-color: #fff;
  width: 100%;
  max-width: 900px;
`;

const AppointmentCard = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
`;

const AppointmentStatus = styled.div`
  color: ${({ accepted }) => (accepted ? 'green' : 'red')};
  font-weight: bold;
`;

const PaymentConfirmationModal = ({ open, onClose, onConfirm }) => (
  <Modal open={open} onClose={onClose}>
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        borderRadius: '12px',
      }}
    >
      <Typography variant="h6" component="h2">
        Pay Rs. 100 to Confirm Your Booking
      </Typography>
      <Button variant="contained" color="primary" onClick={onConfirm}>
        Proceed to Payment
      </Button>
    </Box>
  </Modal>
);

const TherapyScheduling = () => {
  const [open, setOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [selectedTherapist, setSelectedTherapist] = useState(null);
  const [date, setDate] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [feeling, setFeeling] = useState('');
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleOpen = (therapist) => {
    setSelectedTherapist(therapist);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedTherapist(null);
    setDate('');
    setSelectedTimeSlot('');
    setFeeling('');
  };

  const handleBooking = () => {
    const newAppointment = {
      therapist: selectedTherapist.name,
      date,
      time: selectedTimeSlot,
      feeling,
      accepted: false, // Default to not accepted
    };
    setAppointments([...appointments, newAppointment]);
    handleClose();
    setPaymentOpen(true); // Show payment confirmation modal
  };

  const handlePaymentConfirmation = () => {
    // Initialize Razorpay payment
    const options = {
      key: 'rzp_test_AWrlyaXOO9ncih', // Replace with your Razorpay key
      amount: 100 * 100, // Amount in paise
      currency: 'INR',
      name: 'Therapy Booking',
      description: 'Payment for therapy session booking',
      handler: function (response) {
        alert('Payment successful!');
        // Update appointment status or proceed as needed
        setPaymentOpen(false);
      },
      prefill: {
        name: 'Divakar',
        email: 'diva7@example.com',
        contact: '9234567890',
      },
      theme: {
        color: '#3399cc',
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };
  const BASE_URL = 'http://localhost:8080/api'; // Replace with your actual backend URL

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/appointments`);
      return response.data;
    } catch (error) {
      console.error('Error fetching appointments:', error);
      return [];
    }
  };
  
  const postAppointment = async (appointment) => {
    try {
      await axios.post(`${BASE_URL}/appointments`, appointment);
    } catch (error) {
      console.error('Error posting appointment:', error);
    }
  };
  return (
    <Container>
      <Typography variant="h4" gutterBottom sx={{ fontFamily: 'Poppins', marginTop: '2rem' }}>
        Schedule Your Therapy
      </Typography>
      <Typography variant="body1" gutterBottom sx={{ fontFamily: 'Poppins' }}>
        Schedule and manage therapy sessions with ease.
      </Typography>
      <BenefitsSection>
        <Typography variant="h6" gutterBottom sx={{ fontFamily: 'Sans-serif' }}>
          Benefits of Therapy
        </Typography>
        <Typography variant="body2" sx={{ fontFamily: 'Poppins' }}>
          Therapy provides a safe space to talk about your feelings, improve your mental health, and learn coping strategies. It can help you manage stress, understand yourself better, and improve your relationships.
        </Typography>
      </BenefitsSection>
      {therapists.map((therapist) => (
        <TherapistContainer key={therapist.id}>
          <ProfilePic src={therapist.image} alt={therapist.name} />
          <InfoContainer>
            <Typography variant="h6" sx={{ fontFamily: 'Poppins' }}>{therapist.name}</Typography>
            <Typography variant="body2" sx={{ fontFamily: 'sans-serif' }}>{therapist.notes}</Typography>
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
            width: 500,
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
          <TimeSlotSelect
            value={selectedTimeSlot}
            onChange={(e) => setSelectedTimeSlot(e.target.value)}
            displayEmpty
          >
            <MenuItem value="" disabled>Select Time Slot</MenuItem>
            {selectedTherapist?.availableTimes.map((timeSlot, index) => (
              <MenuItem key={index} value={timeSlot}>
                {timeSlot}
              </MenuItem>
            ))}
          </TimeSlotSelect>
          <TextField
            label="How do you feel?"
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
      <PaymentConfirmationModal
        open={paymentOpen}
        onClose={() => setPaymentOpen(false)}
        onConfirm={handlePaymentConfirmation}
      />
      <AppointmentsSection>
        <Typography variant="h6" gutterBottom sx={{ fontFamily: 'Poppins' }}>
          My Appointments
        </Typography>
        {appointments.length === 0 ? (
          <Typography variant="body2" sx={{ fontFamily: 'Poppins' }}>
            No appointments booked yet.
          </Typography>
        ) : (
          appointments.map((appointment, index) => (
            <AppointmentCard key={index}>
              <div>
                <Typography variant="h6" sx={{ fontFamily: 'Poppins' }}>
                  {appointment.therapist}
                </Typography>
                <Typography variant="body2" sx={{ fontFamily: 'Poppins' }}>
                  Date: {appointment.date}
                </Typography>
                <Typography variant="body2" sx={{ fontFamily: 'Poppins' }}>
                  Time: {appointment.time}
                </Typography>
                <Typography variant="body2" sx={{ fontFamily: 'Poppins' }}>
                  Feeling: {appointment.feeling}
                </Typography>
              </div>
              <AppointmentStatus accepted={appointment.accepted}>
                {appointment.accepted ? 'Accepted by Doctor' : 'Pending Approval'}
              </AppointmentStatus>
            </AppointmentCard>
          ))
        )}
        {/* <Payment/> */}
      </AppointmentsSection>
    </Container>
  );
};

export default TherapyScheduling;
