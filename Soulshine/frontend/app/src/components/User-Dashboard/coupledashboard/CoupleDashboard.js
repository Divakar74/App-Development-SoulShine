import React, { useState, useEffect } from 'react';
import './CoupleDashboard.css'; // Import the CSS file for styling
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import axios from 'axios';

// Dashboard Header Component
const DashboardHeader = () => (
  <header className="dashboard-header">
    <h1>Welcome!</h1>
    <p>Engage in activities, resolve conflicts, and track your progress together.</p>
  </header>
);

// Daily Reflection Component
const DailyReflection = ({ onReflectionChange }) => {
  const [mood, setMood] = useState('');
  const [journal, setJournal] = useState('');

  const handleMoodChange = (value) => setMood(value);
  const handleJournalChange = (e) => {
    setJournal(e.target.value);
    onReflectionChange(e.target.value); // Notify parent component
  };

  return (
    <section className="daily-reflection">
      <h2>Daily Reflection</h2>
      <div className="mood-entry">
        <h3>Record Your Mood 😊</h3>
        <div className="mood-icons">
          <Button variant="contained" onClick={() => handleMoodChange('happy')}>😊 Happy</Button>
          <Button variant="contained" onClick={() => handleMoodChange('sad')}>😢 Sad</Button>
          <Button variant="contained" onClick={() => handleMoodChange('excited')}>😃 Excited</Button>
          <Button variant="contained" onClick={() => handleMoodChange('angry')}>😠 Angry</Button>
        </div>
      </div>
      <div className="journaling">
        <h3>Journal Your Day 📖</h3>
        <TextField
          label="Describe your day..."
          multiline
          rows={2}
          fullWidth
          variant="outlined"
          value={journal}
          onChange={handleJournalChange}
          className="text-field"
        />
      </div>
    </section>
  );
};

// Gratitude Journal Component
const GratitudeJournal = ({ onGratitudeChange }) => {
  const [gratitude, setGratitude] = useState('');

  const handleGratitudeChange = (e) => {
    setGratitude(e.target.value);
    onGratitudeChange(e.target.value); // Notify parent component
  };

  return (
    <section className="gratitude-journal">
      <h2>Gratitude Journal</h2>
      <div className="quote-box">
        <p>"Gratitude turns what we have into enough." - Anonymous</p>
      </div>
      <div className="journaling">
        <h3>Record Your Gratitude 🙏</h3>
        <TextField
          label="What are you grateful for today?"
          multiline
          rows={2}
          fullWidth
          variant="outlined"
          value={gratitude}
          onChange={handleGratitudeChange}
          className="text-field"
        />
      </div>
    </section>
  );
};

// Couple Goals Component
const CoupleGoals = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [goal, setGoal] = useState('');
  const [place, setPlace] = useState('');

  const handleGoalChange = (e) => setGoal(e.target.value);
  const handlePlaceChange = (e) => setPlace(e.target.value);
  const handlePopupOpen = () => setShowPopup(true);
  const handlePopupClose = () => setShowPopup(false);
  const handleGoalSubmit = () => {
    console.log('Goal submitted:', goal, 'Place:', place);
    setGoal('');
    setPlace('');
    setShowPopup(false);
  };

  return (
    <section className="couple-goals">
      <h2>Goals</h2>
      <div className="quote-box">
        <p>"The best thing to hold onto in life is each other." - Audrey Hepburn</p>
      </div>
      <div className="goals-options">
        <Button variant="contained" onClick={handlePopupOpen}>Food 🍲</Button>
        <Button variant="contained">Travel ✈️</Button>
        <Button variant="contained">Career 💼</Button>
        <Button variant="contained">Finance 💰</Button>
        <Button variant="contained">Health 🏋️‍♂️</Button>
      </div>
      <Dialog open={showPopup} onClose={handlePopupClose}>
        <DialogTitle>Record Your Food Goals 🍽️</DialogTitle>
        <DialogContent>
          <TextField
            label="What are your food goals with your partner?"
            multiline
            rows={2}
            fullWidth
            variant="outlined"
            value={goal}
            onChange={handleGoalChange}
            className="text-field"
          />
          <TextField
            label="Describe your favorite food places..."
            multiline
            rows={2}
            fullWidth
            variant="outlined"
            value={place}
            onChange={handlePlaceChange}
            className="text-field"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePopupClose}>Close</Button>
          <Button onClick={handleGoalSubmit}>Submit Goal</Button>
        </DialogActions>
      </Dialog>
    </section>
  );
};

// Conflict Resolution Component
const ConflictResolution = ({ onConflictChange }) => {
  const [issue, setIssue] = useState('');

  const handleSubmit = () => {
    onConflictChange(issue); // Notify parent component
    // Add additional logic if needed
  };

  return (
    <section className="conflict-resolution">
      <h2>Conflict Resolution</h2>
      <TextField
        label="Describe the conflict."
        multiline
        rows={2}
        fullWidth
        variant="outlined"
        value={issue}
        onChange={(e) => setIssue(e.target.value)}
        className="text-field"
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
    </section>
  );
};

// Progress Tracker Component
const ProgressTracker = ({ dailyReflection, gratitudeJournal, conflictResolution }) => {
  const [generatedText, setGeneratedText] = useState('');
  const [progress, setProgress] = useState([
    { date: '2024-08-01', status: 'Completed Reflection' },
    { date: '2024-08-05', status: 'Gratitude Journal Updated' },
  ]);

  const handleGenerateReport = async () => {
    try {
      const response = await axios.post(
        'https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=AIzaSyCzXDlULQQ3BOlCudcV7LNdqusNJSM6hBw', // Replace with your API key
        {
          contents: [
            {
              role: 'user',
              parts: [{ text: conflictResolution }], // Send only conflict resolution text
            },
          ],
        }
      );

      if (response.data && Array.isArray(response.data.candidates) && response.data.candidates.length > 0) {
        const candidate = response.data.candidates[0];

        if (candidate.content && candidate.content.parts && candidate.content.parts.length > 0) {
          const textPart = candidate.content.parts[0];
          setGeneratedText(textPart.text);
        } else {
          console.error('No valid parts found in candidate.content:', candidate.content);
        }
      } else {
        console.error('Unexpected response structure:', response.data);
      }
    } catch (error) {
      console.error('Error generating report:', error);
    }
  };

  useEffect(() => {
    if (conflictResolution) {
      handleGenerateReport();
    }
  }, [conflictResolution]);

  return (
    <section className="progress-tracker">
      <h2>Progress Tracker</h2>
      <div className="report-section">
        <h3>Generated Report 📊</h3>
        {generatedText && (
          <div className="generated-report">
            <p>{generatedText}</p>
          </div>
        )}
      </div>
      <div className="user-entries">
        <h3>User Entries</h3>
        <div className="entries-box">
          <div className="entry-box">
            <h4>Daily Reflection</h4>
            <p>{dailyReflection}</p>
          </div>
          <div className="entry-box">
            <h4>Gratitude Journal</h4>
            <p>{gratitudeJournal}</p>
          </div>
        </div>
      </div>
      {/* <ul>
        {progress.map((entry, index) => (
          <li key={index}>
            <strong>{entry.date}:</strong> {entry.status}
          </li>
        ))}
      </ul> */}
    </section>
  );
};

// Main CoupleDashboard Component
const CoupleDashboard = () => {
  const [dailyReflection, setDailyReflection] = useState('');
  const [gratitudeJournal, setGratitudeJournal] = useState('');
  const [conflictResolution, setConflictResolution] = useState('');

  const handleReflectionChange = (reflection) => setDailyReflection(reflection);
  const handleGratitudeChange = (gratitude) => setGratitudeJournal(gratitude);
  const handleConflictChange = (conflict) => setConflictResolution(conflict);

  return (
    <div className="couple-dashboard">
      <DashboardHeader />
      <DailyReflection onReflectionChange={handleReflectionChange} />
      <GratitudeJournal onGratitudeChange={handleGratitudeChange} />
      <ConflictResolution onConflictChange={handleConflictChange} />
      <CoupleGoals />
      <ProgressTracker
        dailyReflection={dailyReflection}
        gratitudeJournal={gratitudeJournal}
        conflictResolution={conflictResolution}
      />
    </div>
  );
};

export default CoupleDashboard;
