import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  Container,
  CardContent,
  Typography,
  Grid,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Link,
  TextField,
  Fab,
  Collapse,
  IconButton
} from '@mui/material';
import { Add as AddIcon, ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import styled from 'styled-components';
import Calendar from 'react-calendar';
import MoodChart from './MoodChart'; // Assume you have a MoodChart component
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import FamilyIcon from '@mui/icons-material/FamilyRestroom';
import PeopleIcon from '@mui/icons-material/People';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import SleepIcon from '@mui/icons-material/NightsStay';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import CleanHandsIcon from '@mui/icons-material/CleanHands';
import GamepadIcon from '@mui/icons-material/Gamepad';
import MovieIcon from '@mui/icons-material/Movie';
import BookIcon from '@mui/icons-material/Book';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import quotes from '../../quotes/quotes';
import ChatPage from '../Chatbot/ChatPage';
import ChatIcon from '@mui/icons-material/Chat'; 
import { Button as MuiButton } from '@mui/material';
import '../../App.css';
import MoodEntryCard from './individualdashboard/MoodEntryCard';
import TrackingHabitsCard from './individualdashboard/TrackingHabitsCard';


const QuoteBox = styled(Box)`
  text-align: center;
  margin-bottom: 2rem;
  margin-top:4rem;
  padding: 1rem; /* Add padding for better text spacing */
  border-radius: 12px; /* Round corners */
  background: url('https://images.unsplash.com/photo-1542349314-b0ceb4d90f2d?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ymx1ZSUyMGNsb3Vkc3xlbnwwfHwwfHx8MA%3D%3D') no-repeat center center; /* Add the cloudy background image */
  background-size: cover; /* Ensure the background image covers the entire box */
  color: #fff; /* White text color for contrast against the background */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Add a subtle shadow for better focus */
`;

const MoodEntrySection = styled(Card)`
  padding: 1rem;
  margin: 1rem 0;
`;

const MoodContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  max-width: 200px;
  margin: 1rem auto;
`;


const MoodEntryItem = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0.5rem;
  text-align: center;
  cursor: pointer;

  & > svg {
    font-size: 3rem;
    color: ${props => props.active ? '#3f51b5' : '#999'};
  }

  & > p {
    margin-top: 0.5rem;
  }
`;

const TrackingBox = styled(Card)`
  padding: 1rem;
  border-radius: 12px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const TrackingItem = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0.5rem;
  text-align: center;
  cursor: pointer;

  & > svg {
    font-size: 2.5rem;
    color: ${props => props.active ? '#3f51b5' : '#999'};
  }

  & > p {
    margin-top: 0.5rem;
  }
`;

const ExpandableCard = styled(Card)`
  margin-top: 1rem;
  border-radius: 12px;
  overflow: hidden;
`;

const MoodChartCard = styled(Card)`
  margin-top: 1rem;
  border-radius: 12px;
`;

const StatusBox = styled(Box)`
  padding: 1rem;
  border-radius: 12px;
  background-color: #f5f5f5;
  margin: 0.5rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ScoreBox = styled(Box)`
  padding: 1rem;
  border-radius: 12px;
  background-color: #e0f7fa;
  margin: 0.5rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;


const Title = styled.h2`
  font-size: 1.5rem; /* Medium size text */
  text-align: center;
  margin-bottom: 1.5rem;
`;

const ButtonContainer = styled.div`
  margin-top: 1rem;
`;

const CustomButton = styled(MuiButton)`
  background-color: #004d40;
  color: white;
  &:hover {
    background-color: lightblue;
  }
`;


const iconMapping = {
  family: <FamilyIcon />,
  friends: <PeopleIcon />,
  date: <CalendarTodayIcon />,
  exercise: <FitnessCenterIcon />,
  sport: <SportsSoccerIcon />,
  sleep: <SleepIcon />,
  eatHealthy: <FastfoodIcon />,
  cleaning: <CleanHandsIcon />,
  gaming: <GamepadIcon />,
  movies: <MovieIcon />,
  reading: <BookIcon />,
  shopping: <ShoppingCartIcon />
};

// Assign scores to each mood
const moodScores = {
  happy: 5,
  good: 4,
  meh: 3,
  bad: 2,
  awful: 1
};

// Assign scores to each thing to track
const trackingScores = {
  family: 1,
  friends: 1,
  date: 1,
  exercise: 2,
  sport: 2,
  sleep: 2,
  eatHealthy: 2,
  cleaning: 1,
  gaming: 1,
  movies: 1,
  reading: 1,
  shopping: 1
};

const getTodaysQuote = () => {
  const today = new Date();
  const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
  const index = dayOfYear % quotes.length;
  return quotes[index];
};

const IndividualDashboard = () => {
  const [quote, setQuote] = useState('');
  const [open, setOpen] = useState(false);
  const [entry, setEntry] = useState({
    mood: '',
    track: [],
    note: '',
    image: '',
    voiceMemo: ''
  });
  const [expanded, setExpanded] = useState(false);
  const [moodEntries, setMoodEntries] = useState([]);
  const [dailyStatus, setDailyStatus] = useState({
    mood: '',
    time: '',
    moodCount: 0,
    averageMood: 0,
    totalScore: 0
  });
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [markedDates, setMarkedDates] = useState({});
  const [newTrackItem, setNewTrackItem] = useState('');
  const [showNewTrackItemDialog, setShowNewTrackItemDialog] = useState(false);

  useEffect(() => {
    setQuote(getTodaysQuote());
    

    // Calculate average mood score
    const totalMoodScore = moodEntries.reduce((acc, entry) => acc + moodScores[entry.mood], 0);
    const averageMood = moodEntries.length ? totalMoodScore / moodEntries.length : 0;

    // Calculate total score for the day
    const totalScore = moodEntries.reduce((acc, entry) => {
      const moodScore = moodScores[entry.mood] || 0;
      const trackingScore = entry.track.reduce((acc, item) => acc + (trackingScores[item] || 0), 0);
      return acc + moodScore + trackingScore;
    }, 0);

    // Update daily status
    const today = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setDailyStatus({
      mood: entry.mood || 'No Mood Selected',
      time: today,
      moodCount: moodEntries.length,
      averageMood: averageMood.toFixed(2),
      totalScore: totalScore
    });

    // Prepare calendar marked dates
    const newMarkedDates = {};
    moodEntries.forEach(entry => {
      const date = new Date(entry.date).toLocaleDateString();
      newMarkedDates[date] = entry.mood;
    });
    setMarkedDates(newMarkedDates);
  }, [moodEntries, entry.mood, entry.track]);

  const [chatOpen, setChatOpen] = useState(false); // Defining state for chat

  const handleChatToggle = () => {
    setChatOpen(!chatOpen);
  };
  const handleChatOpen = () => setChatOpen(true);
  const handleChatClose = () => setChatOpen(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = (e) => setEntry({ ...entry, [e.target.name]: e.target.value });
  const handleTrackChange = (trackItem) => {
    setEntry(prevEntry => {
      const updatedTrack = prevEntry.track.includes(trackItem)
        ? prevEntry.track.filter(item => item !== trackItem)
        : [...prevEntry.track, trackItem];
      return { ...prevEntry, track: updatedTrack };
    });
  };
  const handleSave = () => {
    setMoodEntries([...moodEntries, { ...entry, date: calendarDate }]);
    setEntry({
      mood: '',
      track: [],
      note: '',
      image: '',
      voiceMemo: ''
    });
    setOpen(false);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleDateChange = (date) => {
    setCalendarDate(date);
  };

  const handleMoodClick = (mood) => {
    setEntry({ ...entry, mood });
  };

  const handleNewTrackItemChange = (e) => {
    setNewTrackItem(e.target.value);
  };

  const handleAddNewTrackItem = () => {
    if (newTrackItem) {
      trackingScores[newTrackItem] = 1; // Assign a default score to new tracking items
      iconMapping[newTrackItem] = <AddIcon />; // Assign a default icon to new tracking items
      setShowNewTrackItemDialog(false);
    }
  };

  return (
    <Box sx={{ padding: '2rem' }}>
      <QuoteBox>
        <Typography variant="h5">{quote}</Typography>
      </QuoteBox>
      {/* <MoodEntrySection>
        <Typography variant="h6">How do you feel Today?</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <StatusBox>
              <Typography variant="h6">Daily Status</Typography>
              <MoodContainer>
              <Typography>Mood: {dailyStatus.mood}</Typography>
              </MoodContainer>
              <Typography>Time: {dailyStatus.time}</Typography>
              <Typography>Mood Count: {dailyStatus.moodCount}</Typography>
              <Typography>Average Mood: {dailyStatus.averageMood}</Typography>
            </StatusBox>
            <ScoreBox>
              <Typography variant="h6">Score</Typography>
              <Typography>{dailyStatus.totalScore}</Typography>
            </ScoreBox>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TrackingBox>
              {Object.keys(iconMapping).map((key) => (
                <TrackingItem
                  key={key}
                  active={entry.track.includes(key)}
                  onClick={() => handleTrackChange(key)}
                >
                  {iconMapping[key]}
                  <Typography>{key}</Typography>
                </TrackingItem>
              ))}
              <Fab color="primary" aria-label="add" size="small" onClick={() => setShowNewTrackItemDialog(true)}>
                <AddIcon />
              </Fab>
            </TrackingBox>
          </Grid>
        </Grid>
        <Box display="flex" justifyContent="center" mt={2}>
          <Fab color="primary" aria-label="add" onClick={handleOpen}>
            <AddIcon />
          </Fab>
          <Container>
      <Box style={{ marginLeft: '30rem' }}>
        <Typography>Feeling Left out?</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleChatOpen}
          startIcon={<ChatIcon />}
          style={{ marginTop: '1rem' }}
        >
          Chat with Me
        </Button>
      </Box>
    </Container>
      <Dialog open={chatOpen} onClose={handleChatClose} fullWidth maxWidth="md">
        <DialogTitle>Chat with Me</DialogTitle>
        <DialogContent>
          <ChatPage />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleChatClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
        </Box>
      </MoodEntrySection> */}
{/* 
      <MoodChartCard>
        <CardContent>
          <MoodChart moodEntries={moodEntries} />
        </CardContent>
      </MoodChartCard> */}
      
      {/* <ExpandableCard>
        <CardContent>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h6">Daily Status Details</Typography>
            <IconButton onClick={handleExpandClick} aria-expanded={expanded}>
              <ExpandMoreIcon />
            </IconButton>
          </Box>
          <Collapse in={expanded}>
            <Box>
              <Typography variant="body1">
                Here, you can track your daily moods, see your average mood score, and check the activities you've tracked.
              </Typography>
            </Box>
          </Collapse>
        </CardContent>
      </ExpandableCard> */}
      {/* <Container className='con'>
      <Title>Attend this section to analyse about yourself</Title>
      <ButtonContainer className='button-container'>
        <Button href="/newpage" style={{ textDecoration: 'none' }}>
        <div className='centered-button'>
          <CustomButton variant="contained">Hell Yeah</CustomButton>
        </div></Button>
      </ButtonContainer>
    </Container> */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Mood Entry</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography>Select Mood</Typography>
              <Box display="flex" justifyContent="space-around" mt={1}>
                <MoodEntryItem active={entry.mood === 'happy'} onClick={() => handleMoodClick('happy')}>
                  <EmojiEmotionsIcon />
                  <Typography>Happy</Typography>
                </MoodEntryItem>
                <MoodEntryItem active={entry.mood === 'good'} onClick={() => handleMoodClick('good')}>
                  <SentimentSatisfiedIcon />
                  <Typography>Good</Typography>
                </MoodEntryItem>
                <MoodEntryItem active={entry.mood === 'meh'} onClick={() => handleMoodClick('meh')}>
                  <SentimentNeutralIcon />
                  <Typography>Meh</Typography>
                </MoodEntryItem>
                <MoodEntryItem active={entry.mood === 'bad'} onClick={() => handleMoodClick('bad')}>
                  <SentimentDissatisfiedIcon />
                  <Typography>Bad</Typography>
                </MoodEntryItem>
                <MoodEntryItem active={entry.mood === 'awful'} onClick={() => handleMoodClick('awful')}>
                  <SentimentVeryDissatisfiedIcon />
                  <Typography>Awful</Typography>
                </MoodEntryItem>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Note"
                name="note"
                fullWidth
                multiline
                rows={3}
                value={entry.note}
                onChange={handleChange}
              />
            </Grid>
            {/* <Grid item xs={12}>
              <TextField
                label="Image URL"
                name="image"
                fullWidth
                value={entry.image}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Voice Memo URL"
                name="voiceMemo"
                fullWidth
                value={entry.voiceMemo}
                onChange={handleChange}
              />
            </Grid> */}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={showNewTrackItemDialog} onClose={() => setShowNewTrackItemDialog(false)}>
        <DialogTitle>Add New Track Item</DialogTitle>
        <DialogContent>
          <TextField
            label="New Track Item"
            fullWidth
            value={newTrackItem}
            onChange={handleNewTrackItemChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowNewTrackItemDialog(false)}>Cancel</Button>
          <Button onClick={handleAddNewTrackItem}>Add</Button>
        </DialogActions>
      </Dialog>

      {/* <div>
        <MoodChart/>
      <MoodEntryCard/>
      <TrackingHabitsCard/>
    </div>  */}
    </Box>
  );
};

export default IndividualDashboard;
