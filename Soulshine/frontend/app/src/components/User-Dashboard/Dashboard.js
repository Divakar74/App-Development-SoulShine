import React, { useState } from 'react';
import { Box, Container, Grid, Typography, Card, CardContent, IconButton } from '@mui/material';
import { useParams } from 'react-router-dom';
import MoodChart from './MoodChart';
import MoodEntryCard from './individualdashboard/MoodEntryCard';
import CalendarComponent from '../Calendar/Partials/Calendar';
import CoupleDashboard from './coupledashboard/CoupleDashboard';
import { motion, AnimatePresence } from 'framer-motion';
import { Assignment, Event, House } from '@mui/icons-material';
import TrackingHabitsCard from './individualdashboard/TrackingHabitsCard';
import TherapyScheduling from './TherapyScheduling';

const pebblesSvg = encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <defs>
    <radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
      <stop offset="0%" style="stop-color:rgba(255, 255, 255, 0.9); stop-opacity:1" />
      <stop offset="100%" style="stop-color:rgba(173, 216, 230, 0.9); stop-opacity:1" />
    </radialGradient>
  </defs>
  <circle cx="15" cy="30" r="6" fill="url(#grad1)" />
  <circle cx="35" cy="50" r="5" fill="url(#grad1)" />
  <circle cx="55" cy="40" r="7" fill="url(#grad1)" />
  <circle cx="75" cy="60" r="5" fill="url(#grad1)" />
  <circle cx="95" cy="30" r="5" fill="url(#grad1)" />
  <circle cx="115" cy="70" r="5" fill="url(#grad1)" />
  <circle cx="135" cy="50" r="5" fill="url(#grad1)" />
  <circle cx="155" cy="80" r="7" fill="url(#grad1)" />
  <circle cx="175" cy="40" r="6" fill="url(#grad1)" />
  <circle cx="195" cy="60" r="5" fill="url(#grad1)" />
  <circle cx="45" cy="110" r="6" fill="url(#grad1)" />
  <circle cx="65" cy="120" r="5" fill="url(#grad1)" />
  <circle cx="85" cy="100" r="7" fill="url(#grad1)" />
  <circle cx="105" cy="110" r="6" fill="url(#grad1)" />
  <circle cx="125" cy="120" r="5" fill="url(#grad1)" />
  <circle cx="145" cy="100" r="7" fill="url(#grad1)" />
  <circle cx="165" cy="110" r="6" fill="url(#grad1)" />
  <circle cx="185" cy="120" r="5" fill="url(#grad1)" />
</svg>
`);

const Dashboard = () => {
  const [moodEntries, setMoodEntries] = useState([]);
  const { type } = useParams(); // Get the type from URL params

  const [activeComponent, setActiveComponent] = useState('');

  const handleIconClick = (component) => {
    setActiveComponent(component);
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case 'home':
        return <MoodEntryCard />;
      case 'tasks':
        return <TrackingHabitsCard />;
      case 'appointment':
        return <TherapyScheduling/>;
      default:
        return null;
    }
  };

  const handleSaveMoodEntry = (entry) => {
    setMoodEntries((prevEntries) => [...prevEntries, entry]);
  };

  const moodData = moodEntries.map((entry) => ({
    date: entry.date,
    mood: entry.mood,
    emojis: entry.emojis.join(' '), // Join emojis into a single string
  }));

  return (
    <Container
      maxWidth="lg"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        py: 4,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '50%',
          background: 'linear-gradient(to bottom right, rgba(173, 216, 230, 0.9), rgba(173, 216, 230, 0.5))',
          borderRadius: '75% 0 75% 0',
          zIndex: -1,
        },
      }}
    >
      <Box>
        <Typography variant="h4" gutterBottom>
          {type === 'couple' ? 'Couples Dashboard' : 'Individual Dashboard'}
        </Typography>
        <Grid container spacing={4}>
          {type === 'couple' ? (
            <Grid item xs={12}>
              <CoupleDashboard />
            </Grid>
          ) : (
            <>
              <Grid item xs={12} style={{ width: '100%' }}>
                <Card sx={{ borderRadius: '16px', boxShadow: 3, mb: 2 }}>
                  <CardContent>
                    <Box display="flex" justifyContent="space-around" my={2}>
                      <motion.div whileHover={{ scale: 1.2 }}>
                        <IconButton
                          onClick={() => handleIconClick('home')}
                          color={activeComponent === 'home' ? 'primary' : 'default'}
                        >
                          <House />
                        </IconButton>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.2 }}>
                        <IconButton
                          onClick={() => handleIconClick('tasks')}
                          color={activeComponent === 'tasks' ? 'primary' : 'default'}
                        >
                          <Assignment />
                        </IconButton>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.2 }}>
                        <IconButton
                          onClick={() => handleIconClick('appointment')}
                          color={activeComponent === 'appointment' ? 'primary' : 'default'}
                        >
                          <Event />
                        </IconButton>
                      </motion.div>
                    </Box>
                  </CardContent>
                </Card>
                {!activeComponent && (
                  <Card
                    variant="outlined"
                    style={{
                      borderRadius: '16px',
                      padding: '20px',
                      maxWidth: '600px',
                      margin: '20px auto',
                    }}
                  >
                    <CardContent>
                      <Box textAlign="center">
                        <Typography
                          variant="h5"
                          gutterBottom
                          style={{ fontFamily: 'Poppins, sans-serif', marginBottom: '10px' }}
                        >
                          Continue Your Journey!
                        </Typography>
                        <Typography
                          variant="body1"
                          color="textSecondary"
                          style={{ marginBottom: '20px', fontFamily: 'Poppins, sans-serif' }}
                        >
                          We're excited to have you here. Let’s continue your journey towards wellness and growth. Explore your dashboard and make the most of the features available to you.
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                )}
              </Grid>
              <Grid item xs={12} style={{ width: '100%' }}>
                <AnimatePresence>
                  {activeComponent && (
                    <motion.div
                      initial={{ opacity: 0, x: '100%' }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: '-100%' }}
                      transition={{ duration: 0.5 }}
                    >
                      {renderComponent()}
                    </motion.div>
                  )}
                </AnimatePresence>
              </Grid>
            </>
          )}
        </Grid>
      </Box>
    </Container>
  );
};

export default Dashboard;
