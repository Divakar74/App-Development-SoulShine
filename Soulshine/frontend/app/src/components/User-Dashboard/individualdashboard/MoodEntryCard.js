import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, TextField, Grid, Button, IconButton, Box,Chip,Dialog,DialogContent } from '@mui/material';
import { MoodBad, Mood, MoodOutlined } from '@mui/icons-material';
import {  Cloud, CloudQueue, CloudOff, Air, AcUnit, House, People, Favorite, NetworkCheck, Celebration, DirectionsRun, Hotel, SportsSoccer, Movie, MenuBook, ShoppingCart, SportsEsports, Pets, Person, Business, Restaurant, CleaningServices, LocalFlorist, SelfImprovement, Flight, CameraAlt, MusicNote } from '@mui/icons-material';
import CustomCalendar from '../../Calendar/Calendar';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import ChatPage from '../../Chatbot/ChatPage';
import { motion, AnimatePresence } from 'framer-motion';
import { Assignment, Event } from '@mui/icons-material';
import MoodChart from '../MoodChart';
import TrackingHabitsCard from './TrackingHabitsCard';
import InputAdornment from '@mui/material/InputAdornment';
import { FavoriteBorder, Edit, AccessibilityNew, Psychology, DirectionsWalk, Yoga, LocalDining, FitnessCenter, VolunteerActivism } from '@mui/icons-material';
import Spa from '@mui/icons-material/Spa';
import { UserContext } from '../../UserContext';

const quotes = [
  "Keep pushing forward!",
  "Great job today!",
  "You're doing amazing!",
  "Stay positive!",
  "Believe in yourself!"
];

const getRandomQuote = () => {
  return quotes[Math.floor(Math.random() * quotes.length)];
};

const MoodEntryCard = ({ onSaveMoodEntry }) => {
  const [response, setResponse] = useState('');
  const [selectedMood, setSelectedMood] = useState('');
  const [selectedWeather, setSelectedWeather] = useState([]);
  const [selectedSocial, setSelectedSocial] = useState([]);
  const [selectedMiscellaneous, setSelectedMiscellaneous] = useState([]);
  const [journal, setJournal] = useState('');
  const [report, setReport] = useState('');
  const [moodEntries, setMoodEntries] = useState([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [quote, setQuote] = useState(getRandomQuote());
  const [generatedText, setGeneratedText] = useState('');
  const [inputValues, setInputValues] = useState({});

  useEffect(() => {
    const fetchMoodEntries = async () => {
      try {
        const result = await axios.get('http://localhost:8080/api/mood-entries');
        console.log('Fetched Mood Entries:', result.data);
  
        const formattedEntries = result.data.map(entry => {
          let createdAt;
          if (entry.createdAt) {  // Adjusted to match the fetched data's field name
            // Log the raw timestamp fetched from the database
            console.log(`Raw timestamp from database: ${entry.createdAt}`);
  
            // Parse the createdAt timestamp into a Date object
            createdAt = new Date(entry.createdAt);
            if (isNaN(createdAt.getTime())) {
              console.error(`Invalid date format: ${entry.createdAt}`);
              createdAt = new Date(); // Fallback to current date if parsing fails
            } else {
              // Log the correctly parsed time for debugging
              console.log(`Correctly parsed createdAt: ${createdAt.toISOString()}`);
            }
          } else {
            console.error('createdAt is missing:', entry);
            createdAt = new Date(); // Fallback to current date if createdAt is missing
          }
  
          return {
            ...entry,
            start: createdAt,  // Ensure start is set to the correctly parsed Date
            end: createdAt     // Ensure end is also set to the same Date
          };
        });
  
        setMoodEntries(formattedEntries);
      } catch (error) {
        console.error('Error fetching mood entries:', error);
      }
    };
  
    fetchMoodEntries();
  }, []);
  
  

  const moodMarks = {
    'Terrible': 10,
    'Bad': 20,
    'Okay': 30,
    'Good': 40,
    'Excellent': 50
  };

  const weatherMarks = {
    'Sunny': 10,
    'Cloudy': 5,
    'Rainy': 5,
    'Windy': 5,
    'Snowy': 10
  };

  const socialMarks = {
    'Family': 15,
    'Friends': 10,
    'Beloved': 20,
    'Colleague': 10,
    'Party': 15,
    'Travelling': 15
  };

  const miscellaneousMarks = {
    'Exercise': 10,
    'Sleep': 10,
    'Sport': 10,
    'Movies': 5,
    'Reading': 5,
    'Shopping': 5,
    'Gaming': 5
  };

  const calculateScore = () => {
    const moodScore = moodMarks[selectedMood] || 0;
    const weatherScore = selectedWeather.reduce((sum, item) => sum + weatherMarks[item], 0);
    const socialScore = selectedSocial.reduce((sum, item) => sum + socialMarks[item], 0);
    const miscellaneousScore = selectedMiscellaneous.reduce((sum, item) => sum + miscellaneousMarks[item], 0);
    return moodScore + weatherScore + socialScore + miscellaneousScore;
  };

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
  };

  const handleOptionToggle = (option, category) => {
    if (category === 'weather') {
      setSelectedWeather((prev) =>
        prev.includes(option) ? prev.filter(item => item !== option) : [...prev, option]
      );
    } else if (category === 'social') {
      setSelectedSocial((prev) =>
        prev.includes(option) ? prev.filter(item => item !== option) : [...prev, option]
      );
    } else if (category === 'miscellaneous') {
      setSelectedMiscellaneous((prev) =>
        prev.includes(option) ? prev.filter(item => item !== option) : [...prev, option]
      );
    }
  };

  const handleJournalChange = (event) => {
    setJournal(event.target.value);
  };

  const addMoodEntry = (entry) => {
    // Combine date and time into a single Date object
    const currentDateTime = new Date(`${entry.date}T${entry.time}`);
    
    // Ensure the end time is one hour later
    const oneHourLater = new Date(currentDateTime.getTime() + 60 * 60 * 1000);
  
    // Create a new entry with title, start, end, and description
    const newEntry = {
      title: `${entry.mood} - Score: ${entry.score}`,
      start: currentDateTime,
      end: oneHourLater,
      description: `Mood: ${entry.mood}\nWeather: ${entry.weather}\nSocial: ${entry.social}\nMiscellaneous: ${entry.miscellaneous}\nJournal: ${entry.journal}\nQuote: ${entry.report}\nTimestamp: ${entry.timestamp}`
    };
  
    // Update the state with the new entry
    setMoodEntries((prevEntries) => [...prevEntries, newEntry]);
    
    // Call the handleSubmit function (presumably to save or submit the entry)
    handleSubmit(entry);
  };
  
  const handleSaveMoodEntry = async () => {
    const score = calculateScore();
    const currentDate = new Date();
    const time = `${currentDate.getHours()}:${currentDate.getMinutes()}`;
    const emojis = [];
  
    switch (selectedMood) {
      case 'Terrible':
        emojis.push('😞');
        break;
      case 'Bad':
        emojis.push('☹️');
        break;
      case 'Okay':
        emojis.push('😐');
        break;
      case 'Good':
        emojis.push('😊');
        break;
      case 'Excellent':
        emojis.push('😁');
        break;
      default:
        break;
    }
  
    const entry = {
      date: currentDate.toISOString().split('T')[0],
      time: time,
      mood: selectedMood,
      weather: selectedWeather.join(','),
      social: selectedSocial.join(','),
      miscellaneous: selectedMiscellaneous.join(','),
      journal: journal,
      report: response,
      score: score,
      emojis: emojis.join(','),
      timestamp: currentDate.toISOString()  // Ensure timestamp is in ISO format
    };
  
    try {
      // Save entry in local state or context (assuming addMoodEntry handles it)
      addMoodEntry(entry);
  
      // Clear the form state
      setSelectedMood('');
      setSelectedWeather([]);
      setSelectedSocial([]);
      setSelectedMiscellaneous([]);
      setJournal('');
      setResponse('');
  
      // Submit the entry to the server
      await handleSubmit(entry);
    } catch (error) {
      console.error('Error saving mood entry:', error);
    }
  };
  
  const handleSubmit = async (entry) => {
    const safeSplit = (str) => {
      return typeof str === 'string' ? str.split(',').map(item => item.trim()).join(',') : '';
    };
  
    const entryToSend = {
      selectedMood: safeSplit(entry.mood),
      selectedWeather: safeSplit(entry.weather),
      selectedSocial: safeSplit(entry.social),
      selectedMiscellaneous: safeSplit(entry.miscellaneous),
      journal: entry.journal || '',
      timestamp: entry.timestamp, // Send timestamp to backend

    };
  
    try {
      const response = await fetch('http://localhost:8080/api/mood-entries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(entryToSend),
      });
  
      if (response.ok) {
        console.log('Mood entry saved successfully');
      } else {
        console.error('Failed to save mood entry');
      }
    } catch (error) {
      console.error('An error occurred while saving the mood entry', error);
    }
  };
  
  const addStoicQuote = (text) => {
    const stoicQuotes = [
      "The impediment to action advances action. What stands in the way becomes the way. – Marcus Aurelius",
      "You have power over your mind - not outside events. Realize this, and you will find strength. – Marcus Aurelius",
      // Add more quotes here...
    ];
  
    const randomQuote = stoicQuotes[Math.floor(Math.random() * stoicQuotes.length)];
    return `${text}\n\n${randomQuote}`;
  };
  
  const handleGenerateReport = async () => {
    try {
      const response = await axios.post(
        'https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=AIzaSyCzXDlULQQ3BOlCudcV7LNdqusNJSM6hBw',
        {
          contents: [
            {
              role: 'user',
              parts: [{ text: journal }],
            },
          ],
        }
      );
  
      if (response.data && Array.isArray(response.data.candidates) && response.data.candidates.length > 0) {
        const candidate = response.data.candidates[0];
      
        if (candidate && candidate.content && candidate.content.parts && Array.isArray(candidate.content.parts) && candidate.content.parts.length > 0) {
          const textPart = candidate.content.parts[0];
          const enhancedText = addStoicQuote(textPart.text);
          setGeneratedText(enhancedText);
        } else {
          console.error('No valid parts found in candidate.content:', candidate.content);
        }
      } else {
        console.error('Unexpected response structure or no candidates found:', response.data);
      }
      
    } catch (error) {
      console.error('Error generating report:', error);
    } finally {
      setJournal('');
    }
  };
  

  const handlemoodentry = async () => {
    try {
      await Promise.all([handleSaveMoodEntry(),handleGenerateReport()]);
    } catch (error) {
      console.error('Error in handleMoodEntry:', error);
    }
  };

  const handleChatOpen = () => {
    setIsChatOpen(true);
  };

  const handleChatClose = () => {
    setIsChatOpen(false);
  };

  const pebblesSvg = encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <defs>
        <radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" style="stop-color:rgb(255,255,255);stop-opacity:1" />
          <stop offset="100%" style="stop-color:rgb(204,229,255);stop-opacity:1" />
        </radialGradient>
      </defs>
      <path d="M0,100 C50,200 150,0 200,100 Z" fill="url(#grad1)" />
    </svg>
  `);
  const renderOption = (option, category, icon) => (
    <Grid item key={option}>
      <Chip
        icon={icon}
        label={option}
        onClick={() => handleOptionToggle(option, category)}
        sx={{
          borderRadius: 2,
          backgroundColor: selectedWeather.includes(option) || selectedSocial.includes(option) || selectedMiscellaneous.includes(option) ? 'primary.light' : 'background.paper',
          color: selectedWeather.includes(option) || selectedSocial.includes(option) || selectedMiscellaneous.includes(option) ? 'primary.contrastText' : 'text.primary',
          fontSize: '1.1rem', // Increase the font size
          padding: '10px 15px', // Increase the padding
          '& .MuiChip-icon': {
            fontSize: '1.5rem', // Increase the icon size
          },
        }}
      />
    </Grid>
   

  );
  return (
    
    <Box>
       <Box sx={{ margin: 2 }}>
    <Card sx={{ borderRadius: '7px', boxShadow: 1, mb: 2 }}>
      <CardContent>
        <Typography variant="h6" component="div" marginTop={2} sx={{ fontFamily: 'Poppins, sans-serif' }}>
          Analyze
        </Typography>
        <TextField
          label="How are you feeling?"
          multiline
          rows={2}
          fullWidth
          variant="outlined"
          margin="normal"
          value={journal}
          onChange={handleJournalChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  color="primary"
                  onClick={handlemoodentry}
                >
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </CardContent>
    </Card>

    <Card sx={{ borderRadius: '7px', boxShadow: 1, mb: 2 }}>
      <CardContent>
        <Typography variant="subtitle1" gutterBottom sx={{ fontFamily: 'Poppins, sans-serif' }}>
          Things You Can Do
        </Typography>
        <Typography variant="body1" gutterBottom>
          {selectedMood && `Mood: ${selectedMood}`}
          {selectedWeather.length > 0 && (selectedMood ? `, Weather: ${selectedWeather.join(', ')}` : `Weather: ${selectedWeather.join(', ')}`)}
          {selectedSocial.length > 0 && (selectedWeather.length > 0 || selectedMood ? `, Social: ${selectedSocial.join(', ')}` : `Social: ${selectedSocial.join(', ')}`)}
          {selectedMiscellaneous.length > 0 && (selectedSocial.length > 0 || selectedWeather.length > 0 || selectedMood ? `, Miscellaneous: ${selectedMiscellaneous.join(', ')}` : `Miscellaneous: ${selectedMiscellaneous.join(', ')}`)}
        </Typography>
        <div>
          {generatedText && (
            <Box sx={{ fontFamily: 'Poppins' }}>
              <Typography variant="body1" sx={{ fontFamily: 'Poppins' }}>
                <ul>
                  {generatedText
                    .split('\n') // Split the text by new lines
                    .map(item => item.replace(/[*-]+/g, '').trim()) // Remove '*', '-' and trim whitespace
                    .filter(item => item) // Remove empty strings
                    .reduce((acc, item) => {
                      // Identify and format subheadings
                      if (item.toLowerCase().includes('observations')) {
                        acc.push(
                          <Typography
                            key={item}
                            variant="body1"
                            sx={{ fontWeight: 'bold', fontFamily: 'Arial, sans-serif' }}
                          >
                            Observations:
                          </Typography>
                        );
                      } else if (item.toLowerCase().includes('potential underlying issues')) {
                        acc.push(
                          <Typography
                            key={item}
                            variant="body1"
                            sx={{ fontWeight: 'bold', fontFamily: 'Arial, sans-serif' }}
                          >
                            Potential Underlying Issues:
                          </Typography>
                        );
                      } else if (item.toLowerCase().includes('recommendations')) {
                        acc.push(
                          <Typography
                            key={item}
                            variant="body1"
                            sx={{ fontWeight: 'bold', fontFamily: 'Arial, sans-serif' }}
                          >
                            Recommendations:
                          </Typography>
                        );
                      } else {
                        acc.push(<li key={item}>{item}</li>);
                      }
                      return acc;
                    }, [])}
                </ul>
              </Typography>
            </Box>
          )}
        </div>
      </CardContent>
    </Card>
  </Box>
              <Typography variant='h6'>
                Track your Mood
              </Typography>
  <AnimatePresence>
    <motion.div
      key="moodEntryCard"
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.5 }}
    >
      <Card
        sx={{
          borderRadius: 7,
          backgroundImage: `url("data:image/svg+xml,${pebblesSvg}")`,
          backgroundSize: 'cover',
          boxShadow: 3,
          mb: 2,
        }}
      >
        <CardContent>
        <Grid item xs={12}>
    <Card sx={{
      borderRadius: '16px',
      boxShadow: 3,
      mb: 2,
      bgcolor: 'transparent',
      color: 'black',
      textAlign: 'center',
      padding: '10px',
      position: 'relative',
      overflow: 'hidden',
      background: `url("data:image/svg+xml,${pebblesSvg}") no-repeat center center`,
      backgroundSize: 'cover',
      // Optional adjustments to enhance the effect
      opacity: 0.8,
    }}>
      <CardContent>
        <Typography variant="body1" sx={{ fontFamily: 'Poppins, sans-serif' }}>
          {quote}
        </Typography>
      </CardContent>
    </Card>
  </Grid>
          <Typography variant="h6" component="div">
            How do you feel today?
          </Typography>
          <Grid container spacing={2} marginTop={2}>
            {['Terrible', 'Bad', 'Okay', 'Good', 'Excellent'].map((mood) => (
              <Grid item key={mood}>
                <Box
                  sx={{
                    borderRadius: '7px',
                    border: '1px solid lightgray',
                    p: 1,
                    m: 1,
                    textAlign: 'center',
                    '&:hover': {
                      backgroundColor: 'lightgray',
                      cursor: 'pointer'
                    }
                  }}
                >
                  <IconButton onClick={() => handleMoodSelect(mood)}>
                    {mood === 'Terrible' && <MoodBad color={selectedMood === mood ? 'primary' : 'inherit'} />}
                    {mood === 'Bad' && <MoodBad color={selectedMood === mood ? 'primary' : 'inherit'} />}
                    {mood === 'Okay' && <Mood color={selectedMood === mood ? 'primary' : 'inherit'} />}
                    {mood === 'Good' && <MoodOutlined color={selectedMood === mood ? 'primary' : 'inherit'} />}
                    {mood === 'Excellent' && <MoodOutlined color={selectedMood === mood ? 'primary' : 'inherit'} />}
                  </IconButton>
                  <Typography variant="caption" sx={{ fontSize: '15px' }}>{mood}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
          <Typography variant="h6" component="div" marginTop={2}>
            How is the weather?
          </Typography>
          <Grid container spacing={2} marginTop={2}>
            {['Sunny', 'Cloudy', 'Rainy', 'Windy', 'Snowy'].map((option) => (
              <Grid item key={option}>
                <Box
                  sx={{
                    borderRadius: '7px',
                    border: '1px solid lightgray',
                    p: 1,
                    m: 2,
                    textAlign: 'center',
                    '&:hover': {
                      backgroundColor: 'lightgray',
                      cursor: 'pointer'
                    }
                  }}
                >
                  <IconButton onClick={() => handleOptionToggle(option, 'weather')}>
                    {option === 'Sunny' && <Cloud color={selectedWeather.includes(option) ? 'primary' : 'inherit'} />}
                    {option === 'Cloudy' && <CloudQueue color={selectedWeather.includes(option) ? 'primary' : 'inherit'} />}
                    {option === 'Rainy' && <CloudOff color={selectedWeather.includes(option) ? 'primary' : 'inherit'} />}
                    {option === 'Windy' && <Air color={selectedWeather.includes(option) ? 'primary' : 'inherit'} />}
                    {option === 'Snowy' && <AcUnit color={selectedWeather.includes(option) ? 'primary' : 'inherit'} />}
                  </IconButton>
                  <Typography variant="caption" sx={{ fontSize: '15px' }}>{option}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
          <Typography variant="h6" component="div" marginTop={2}>
            Who did you spend time with?
          </Typography>
          <Grid container spacing={2} marginTop={2}>
                {renderOption('Family', 'social', <House />)}
                {renderOption('Friends', 'social', <People />)}
                {renderOption('Beloved', 'social', <Favorite />)}
                {renderOption('Colleague', 'social', <NetworkCheck />)}
                {renderOption('Party', 'social', <Celebration />)}
                {renderOption('Travelling', 'social', <DirectionsRun />)}
                {renderOption('Neighbors', 'social', <People />)}
                {renderOption('Pets', 'social', <Pets />)}
                {renderOption('Alone', 'social', <Person />)}
                {renderOption('Coworkers', 'social', <Business />)}
              </Grid>
              <Typography variant="h6" component="div" marginTop={2}>
                What did you do today?
              </Typography>
              <Grid container spacing={2} marginTop={2}>
                {renderOption('Exercise', 'miscellaneous', <DirectionsRun />)}
                {renderOption('Sleep', 'miscellaneous', <Hotel />)}
                {renderOption('Sport', 'miscellaneous', <SportsSoccer />)}
                {renderOption('Movies', 'miscellaneous', <Movie />)}
                {renderOption('Reading', 'miscellaneous', <MenuBook />)}
                {renderOption('Shopping', 'miscellaneous', <ShoppingCart />)}
                {renderOption('Gaming', 'miscellaneous', <SportsEsports />)}
                {renderOption('Cooking', 'miscellaneous', <Restaurant />)}
                {renderOption('Cleaning', 'miscellaneous', <CleaningServices />)}
                {renderOption('Gardening', 'miscellaneous', <LocalFlorist />)}
                {renderOption('Meditation', 'miscellaneous', <SelfImprovement />)}
                {renderOption('Travelling', 'miscellaneous', <Flight />)}
                {renderOption('Photography', 'miscellaneous', <CameraAlt />)}
                {renderOption('Music', 'miscellaneous', <MusicNote />)}
                {renderOption('Relaxation', 'emotional', <Spa />)}
                {renderOption('Gratitude', 'emotional', <FavoriteBorder />)}
                {renderOption('Journaling', 'emotional', <Edit />)}
                {renderOption('Self-care', 'emotional', <AccessibilityNew />)}
                {renderOption('Therapy', 'emotional', <Psychology />)}
                {renderOption('Walk', 'physical', <DirectionsWalk />)}
                {renderOption('Yoga', 'physical', <SelfImprovement />)}
                {renderOption('Nutrition', 'physical', <LocalDining />)}
                {renderOption('Fitness Classes', 'physical', <FitnessCenter />)}
                {renderOption('Volunteering', 'social', <VolunteerActivism />)}
              </Grid>
              
          <Box marginTop={2}>
            <Button variant="contained" color="primary" onClick={handlemoodentry}>
              Save Mood Entry
            </Button>
            <Button variant="outlined" color="secondary" sx={{ ml: 2 }} onClick={handleChatOpen}>
              Chat with Me
            </Button>

          </Box>
        </CardContent>
      </Card>
    </motion.div>
  </AnimatePresence>
  <Grid sx={{ boxShadow: 1, width: '70rem', mb: 2 }}>
    <Typography sx={{ fontFamily: 'Poppins, sans-serif', fontSize: '20px' }}>Track your Progress</Typography><br />
    <Card sx={{ borderRadius: '16px', boxShadow: 3, mb: 2 }}>
      <CustomCalendar moodEntries={moodEntries} />
    </Card>
  </Grid>
  <Typography sx={{ fontFamily: 'Poppins, sans-serif', fontSize: '20px' }}>Mood Chart</Typography>
  <MoodChart data={moodEntries} />
  <ChatPage open={isChatOpen} onClose={handleChatClose} />

</Box>

  );
};

export default MoodEntryCard;
