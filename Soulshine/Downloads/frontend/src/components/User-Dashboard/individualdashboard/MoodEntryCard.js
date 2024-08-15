// MoodEntryCard.js
import React, { useState } from 'react';
import { Card, CardContent, Typography, TextField, Grid, Button, IconButton } from '@mui/material';
import { FaRegHeart } from 'react-icons/fa';
import { AiOutlineSmile, AiOutlineFrown, AiOutlineMeh, AiOutlineLike, AiOutlineStar } from 'react-icons/ai';
import { BsFillCloudSunFill, BsFillCloudRainFill, BsFillCloudsFill, BsFillWindFill, BsSnow } from 'react-icons/bs';
import { GiFamilyHouse, GiFriends, GiHeartBeats, GiPartyPopper, GiNetworkBars } from 'react-icons/gi';

const MoodEntryCard = () => {
  const [showOptimism, setShowOptimism] = useState(false);
  const [showHealth, setShowHealth] = useState(false);
  const [showStressReliever, setShowStressReliever] = useState(false);

  return (
    <Card variant="outlined" style={{ margin: '20px', padding: '20px' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Mood Entry
        </Typography>
        
        <Grid container spacing={2}>
          {/* Mood Emoji Selection */}
          <Grid item xs={12}>
            <Typography variant="body1">How are you feeling today?</Typography>
            <div>
              <IconButton aria-label="terrible"><AiOutlineFrown size={30} title="Terrible" /></IconButton>
              <IconButton aria-label="bad"><AiOutlineFrown size={30} title="Bad" /></IconButton>
              <IconButton aria-label="okay"><AiOutlineMeh size={30} title="Okay" /></IconButton>
              <IconButton aria-label="good"><AiOutlineLike size={30} title="Good" /></IconButton>
              <IconButton aria-label="excellent"><AiOutlineStar size={30} title="Excellent" /></IconButton>
            </div>
          </Grid>

          {/* Activities */}
          <Grid item xs={12}>
            <Typography variant="body1">What activities make this feeling?</Typography>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              <Button variant="outlined" startIcon={<BsFillCloudSunFill />}>Sunny</Button>
              <Button variant="outlined" startIcon={<BsFillCloudsFill />}>Cloudy</Button>
              <Button variant="outlined" startIcon={<BsFillCloudRainFill />}>Rainy</Button>
              <Button variant="outlined" startIcon={<BsFillWindFill />}>Windy</Button>
              <Button variant="outlined" startIcon={<BsSnow />}>Snowy</Button>
              <Button variant="outlined" startIcon={<GiFamilyHouse />}>Family</Button>
              <Button variant="outlined" startIcon={<GiFriends />}>Friends</Button>
              <Button variant="outlined" startIcon={<GiHeartBeats />}>Beloved</Button>
              <Button variant="outlined" startIcon={<GiNetworkBars />}>Colleague</Button>
              <Button variant="outlined" startIcon={<GiPartyPopper />}>Party</Button>
              <Button variant="outlined" startIcon={<GiNetworkBars />}>Travelling</Button>
            </div>
          </Grid>

          {/* Mood Journal */}
          <Grid item xs={12}>
            <TextField
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              placeholder="Journal your mood..."
              style={{ marginTop: '10px' }}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default MoodEntryCard;
