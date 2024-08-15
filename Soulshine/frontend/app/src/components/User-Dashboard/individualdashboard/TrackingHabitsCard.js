import React, { useState } from 'react';
import { Card, CardContent, Typography, IconButton, Collapse, Box, Button, Grid, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Favorite,Notifications } from '@mui/icons-material';

const habitsData = {
  Optimism: {
    description: 'Habits to boost your optimism and positive outlook.',
    items: [
      { name: 'Practice smiling', message: 'Put a big warm smile on your face now', emoji: '😊' },
      { name: 'Love yourself', message: 'Take a moment to appreciate yourself', emoji: '❤️' },
      { name: 'Morning inspiration', message: 'Start your day with positive thoughts', emoji: '🌞' },
      { name: 'Pray', message: 'Take time to connect spiritually', emoji: '🙏' },
      { name: 'Gratitude diary', message: 'Write down things you are grateful for', emoji: '📝' },
    ],
  },
  Health: {
    description: 'Habits to maintain and improve your physical health.',
    items: [
      { name: 'Drink water', message: 'Stay hydrated, drink a glass of water', emoji: '💧', water: true },
      { name: 'Eat fruit', message: 'Have a serving of your favorite fruit', emoji: '🍎' },
      { name: 'Reduce sugar', message: 'Avoid sugary snacks today', emoji: '🍬' },
    ],
  },
  StressReliever: {
    description: 'Habits to help you relieve stress and relax.',
    items: [
      { name: 'Meditation', message: 'Take a few minutes to meditate', emoji: '🧘‍♂️' },
      { name: 'Deep breath', message: 'Breathe deeply and relax', emoji: '😌' },
      { name: 'Take a walk', message: 'Go for a short walk', emoji: '🚶‍♀️' },
      { name: 'Clean room', message: 'Tidy up your space', emoji: '🧹' },
      { name: 'Sing a song', message: 'Sing your favorite song', emoji: '🎤' },
    ],
  },
  Sleep: {
    description: 'Habits to ensure you get quality sleep.',
    items: [
      { name: 'Getup early', message: 'Try waking up 30 minutes earlier', emoji: '⏰' },
      { name: 'No screen time before sleep', message: 'Avoid screens an hour before bed', emoji: '📵' },
      { name: 'No alcohol before bedtime', message: 'Skip alcohol before sleeping', emoji: '🍷' },
    ],
  },
  Exercise: {
    description: 'Habits to keep you active and fit.',
    items: [
      { name: 'Stretching', message: 'Do some stretching exercises', emoji: '🤸‍♀️' },
      { name: 'Cycling', message: 'Go for a bike ride', emoji: '🚴' },
      { name: 'Yoga', message: 'Practice some yoga poses', emoji: '🧘‍♀️' },
    ],
  },
  Relationship: {
    description: 'Habits to nurture and strengthen your relationships.',
    items: [
      { name: 'Quality time with family', message: 'Spend some quality time with family', emoji: '👨‍👩‍👧‍👦' },
      { name: 'Chat with friends', message: 'Catch up with a friend', emoji: '💬' },
    ],
  },
  SelfImprovement: {
    description: 'Habits to help you grow and develop new skills.',
    items: [
      { name: 'Reading books', message: 'Read a chapter from a book', emoji: '📚' },
      { name: 'Learning a new language', message: 'Practice a new language', emoji: '🌍' },
      { name: 'Drawing thoughts', message: 'Draw something that represents your thoughts', emoji: '🎨' },
      { name: 'Practicing musical instruments', message: 'Practice playing a musical instrument', emoji: '🎸' },
    ],
  },
};
const TrackingHabitsCard = ({ improvementScore }) => {
  const [expanded, setExpanded] = useState({});
  const [waterIntake, setWaterIntake] = useState(0);
  const [taskCompletion, setTaskCompletion] = useState({});
  const [dailyReminders, setDailyReminders] = useState([]);
  const [reminderTime, setReminderTime] = useState('');
  const [openTimePicker, setOpenTimePicker] = useState(false);
  const [reminderTimeout, setReminderTimeout] = useState(null);

  const handleToggle = (section) => {
    setExpanded((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleWaterIntake = (amount) => {
    setWaterIntake((prev) => prev + amount);
  };

  const handleTaskCompletion = (task) => {
    setTaskCompletion((prev) => ({
      ...prev,
      [task]: !prev[task],
    }));
  };

  const generateDailyReminders = () => {
    const allTasks = Object.values(habitsData).flatMap(section => section.items);
    const reminders = [];
    while (reminders.length < 3) {
      const randomTask = allTasks[Math.floor(Math.random() * allTasks.length)];
      if (!reminders.includes(randomTask)) {
        reminders.push(randomTask);
      }
    }
    setDailyReminders(reminders);
  };

  React.useEffect(() => {
    generateDailyReminders();
  }, []);

  const handleReminderTimeChange = (event) => {
    setReminderTime(event.target.value);
  };

  const handleOpenTimePicker = () => {
    setOpenTimePicker(true);
  };

  const handleCloseTimePicker = () => {
    setOpenTimePicker(false);
  };

  const handleSetReminder = () => {
    if (reminderTimeout) {
      clearTimeout(reminderTimeout);
    }
    const now = new Date();
    const [hours, minutes] = reminderTime.split(':').map(Number);
    const reminderDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
    const timeUntilReminder = reminderDate - now;

    if (timeUntilReminder > 0) {
      const timeout = setTimeout(() => {
        alert('Reminder: Time to check your daily reminders!');
      }, timeUntilReminder);

      setReminderTimeout(timeout);
    }
    handleCloseTimePicker();
  };

  const calculateImprovementScore = (taskCompletion, waterIntake) => {
    const totalTasks = Object.keys(habitsData).flatMap(section => habitsData[section].items).length;
    const completedTasks = Object.values(taskCompletion).filter(completed => completed).length;
    const taskScore = totalTasks > 0 ? (completedTasks / totalTasks) * 50 : 0; // 50% of the score from tasks
  
    const maxWaterIntake = 2000; // Example maximum water intake (2000 ml)
    const waterScore = (waterIntake / maxWaterIntake) * 50; // 50% of the score from water intake
  
    const improvementScore = Math.round(taskScore + waterScore);
    return improvementScore;
  };

  const score = calculateImprovementScore(taskCompletion, waterIntake);

  return (
    <Box style={{ margin: '20px', padding: '20px' }}>
      {/* Daily Reminders with Notification Icon and Time Picker */}
      <Card variant="outlined" style={{ padding: '10px', borderRadius: '16px', marginBottom: '20px' }}>
        <CardContent>
          <Box display="flex" alignItems="center">
            <Typography variant="h6" gutterBottom style={{ flex: 1 , fontFamily: 'Poppins, sans-serif' }}>
              Daily Reminders
            </Typography>
            <IconButton onClick={handleOpenTimePicker}>
              <Notifications />
            </IconButton>
          </Box>
          <Box mt={2}>
            {dailyReminders.map((task, index) => (
              <Typography key={index} variant="body2" style={{ marginBottom: '10px' }}>
                {task.emoji} {task.message}
              </Typography>
            ))}
          </Box>
        </CardContent>
      </Card>

      {/* Time Picker Dialog */}
      <Dialog open={openTimePicker} onClose={handleCloseTimePicker}>
        <DialogTitle>Set Reminder Time</DialogTitle>
        <DialogContent>
          <TextField
            label="Reminder Time"
            type="time"
            value={reminderTime}
            onChange={handleReminderTimeChange}
            InputLabelProps={{ shrink: true }}
            style={{ width: '100%' }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSetReminder} color="primary">
            Set Reminder
          </Button>
          <Button onClick={handleCloseTimePicker} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Grid Layout for Habit Sections */}
      <Grid container spacing={2}>
        {Object.keys(habitsData).map((section) => (
          <Grid item xs={12} sm={6} key={section}>
            <Card variant="outlined" style={{ padding: '10px', borderRadius: '16px' }}>
              <CardContent>
                <Typography 
                  variant="h6" 
                  display="flex" 
                  alignItems="center" 
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  {section}
                  <IconButton onClick={() => handleToggle(section)} style={{ marginLeft: '10px' }}>
                    {expanded[section] ? '-' : '+'}
                  </IconButton>
                  <Box ml={1} fontSize="1.5rem">
                    {/* Use emojis relevant to each habit section */}
                    {section === 'Optimism' ? '😊' :
                     section === 'Health' ? '💪' :
                     section === 'StressReliever' ? '🧘‍♂️' :
                     section === 'Sleep' ? '😴' :
                     section === 'Exercise' ? '🏃‍♀️' :
                     section === 'Relationship' ? '❤️' :
                     section === 'SelfImprovement' ? '📚' : '🔍'}
                  </Box>
                </Typography>
                <Typography 
                  variant="body2" 
                  color="textSecondary" 
                  style={{ marginBottom: '10px', fontFamily: 'Poppins, sans-serif' }}
                >
                  {habitsData[section].description}
                </Typography>
                <Collapse in={expanded[section]}>
                  <Grid container spacing={2}>
                    {habitsData[section].items.map((item) => (
                      <Grid item xs={12} sm={6} key={item.name}>
                        <Box 
                          mb={1} 
                          display="flex" 
                          flexDirection="column" 
                          alignItems="flex-start" 
                          style={{ marginBottom: '5px' }}
                        >
                          <Typography 
                            variant="body2" 
                            style={{ marginBottom: '5px', fontFamily: 'Poppins, sans-serif' }}
                          >
                            {item.emoji} {item.name}
                          </Typography>
                          {item.water && (
                            <Box mb={1}>
                              <Button size="small" onClick={() => handleWaterIntake(100)}>100ml</Button>
                              <Button size="small" onClick={() => handleWaterIntake(200)}>200ml</Button>
                              <Button size="small" onClick={() => handleWaterIntake(500)}>500ml</Button>
                              <Typography 
                                variant="body2" 
                                ml={1} 
                                style={{ fontFamily: 'Poppins, sans-serif' }}
                              >
                                Total: {waterIntake / 1000} liters
                              </Typography>
                            </Box>
                          )}
                          <Button 
                            variant={taskCompletion[item.name] ? 'contained' : 'outlined'} 
                            size="small" 
                            onClick={() => handleTaskCompletion(item.name)} 
                            style={{ marginTop: '5px' }}
                          >
                            {taskCompletion[item.name] ? 'Completed' : 'Mark as Done'}
                          </Button>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Collapse>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2} style={{ marginTop: '20px', justifyContent: 'center' }}>
  <Grid item xs={12} sm={6} md={4}>
    <Card variant="outlined" style={{ padding: '10px', borderRadius: '16px', textAlign: 'center' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom style={{ fontFamily: 'Poppins, sans-serif' }}>
          Improvement Score
        </Typography>
        <Typography variant="body1">
          Improvement Score : {score}
        </Typography>
      </CardContent>
    </Card>
  </Grid>
</Grid>

    </Box>
  );
};

export default TrackingHabitsCard;