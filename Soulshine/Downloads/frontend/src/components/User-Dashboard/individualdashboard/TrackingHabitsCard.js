// TrackingHabitsCard.js
import React, { useState } from 'react';
import { Card, CardContent, Typography, IconButton, Collapse, Divider } from '@mui/material';
import { FaRegHeart } from 'react-icons/fa';

const TrackingHabitsCard = () => {
  const [showOptimism, setShowOptimism] = useState(false);
  const [showHealth, setShowHealth] = useState(false);
  const [showStressReliever, setShowStressReliever] = useState(false);

  return (
    <Card variant="outlined" style={{ margin: '20px', padding: '20px' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Tracking Habits
        </Typography>

        {/* Optimism Section */}
        <div>
          <Typography variant="h6">
            Optimism <IconButton onClick={() => setShowOptimism(!showOptimism)}>{showOptimism ? '-' : '+'}</IconButton>
            <FaRegHeart style={{ color: 'red', marginLeft: '10px' }} />
          </Typography>
          <Collapse in={showOptimism}>
            <div style={{ marginTop: '10px' }}>
              <Typography variant="body1">Practice smiling</Typography>
              <Typography variant="body1">Love yourself</Typography>
              <Typography variant="body1">Morning inspiration</Typography>
              <Typography variant="body1">Pray</Typography>
              <Typography variant="body1">Gratitude diary</Typography>
            </div>
          </Collapse>
        </div>

        <Divider style={{ margin: '20px 0' }} />

        {/* Health Section */}
        <div>
          <Typography variant="h6">
            Health <IconButton onClick={() => setShowHealth(!showHealth)}>{showHealth ? '-' : '+'}</IconButton>
            <FaRegHeart style={{ color: 'red', marginLeft: '10px' }} />
          </Typography>
          <Collapse in={showHealth}>
            <div style={{ marginTop: '10px' }}>
              <Typography variant="body1">Drink water</Typography>
              <Typography variant="body1">Eat fruit</Typography>
              <Typography variant="body1">Reduce sugar</Typography>
            </div>
          </Collapse>
        </div>

        <Divider style={{ margin: '20px 0' }} />

        {/* Stress Reliever Section */}
        <div>
          <Typography variant="h6">
            Stress Reliever <IconButton onClick={() => setShowStressReliever(!showStressReliever)}>{showStressReliever ? '-' : '+'}</IconButton>
            <FaRegHeart style={{ color: 'red', marginLeft: '10px' }} />
          </Typography>
          <Collapse in={showStressReliever}>
            <div style={{ marginTop: '10px' }}>
              <Typography variant="body1">Meditation</Typography>
              <Typography variant="body1">Deep breath</Typography>
              <Typography variant="body1">Take a walk</Typography>
              <Typography variant="body1">Clean room</Typography>
              <Typography variant="body1">Sing a song</Typography>
            </div>
          </Collapse>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrackingHabitsCard;
