import React, { useRef, useState, useEffect } from 'react';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { Box, IconButton } from '@mui/material';

const moods = [
  { value: 5, icon: <SentimentVerySatisfiedIcon />, label: 'Very Happy' },
  { value: 4, icon: <EmojiEmotionsIcon />, label: 'Happy' },
  { value: 3, icon: <SentimentSatisfiedIcon />, label: 'Neutral' },
  { value: 2, icon: <SentimentDissatisfiedIcon />, label: 'Sad' },
  { value: 1, icon: <SentimentVeryDissatisfiedIcon />, label: 'Very Sad' },
];

const MoodChart = () => {
  const canvasRef = useRef(null);
  const [moodData, setMoodData] = useState([]);
  const [labels, setLabels] = useState([]);

  const handleMoodInput = (value) => {
    const newMoodData = [...moodData, value];
    const newLabels = [...labels, new Date().toLocaleTimeString()];
    setMoodData(newMoodData);
    setLabels(newLabels);
  };

  useEffect(() => {
    if (moodData.length < 3) return; // Enable the graph after at least three inputs

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawChart(ctx);
  }, [moodData]);

  const drawChart = (ctx) => {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    const padding = 40;
    const dataLength = moodData.length;

    if (dataLength === 0) return;

    const maxMood = Math.max(...moodData);
    const minMood = Math.min(...moodData);

    const yScale = (height - padding * 2) / (maxMood - minMood);
    const xScale = (width - padding * 2) / dataLength;

    ctx.beginPath();
    ctx.moveTo(padding, height - padding - (moodData[0] - minMood) * yScale);

    for (let i = 1; i < dataLength; i++) {
      const x = padding + i * xScale;
      const y = height - padding - (moodData[i] - minMood) * yScale;
      ctx.lineTo(x, y);
    }

    ctx.strokeStyle = '#4caf50';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw points
    for (let i = 0; i < dataLength; i++) {
      const x = padding + i * xScale;
      const y = height - padding - (moodData[i] - minMood) * yScale;
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, 2 * Math.PI);
      ctx.fillStyle = '#4caf50';
      ctx.fill();
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
        {moods.map((mood, index) => (
          <IconButton key={index} onClick={() => handleMoodInput(mood.value)}>
            {mood.icon}
          </IconButton>
        ))}
      </Box>
      {moodData.length >= 3 && (
        <Box display="flex" justifyContent="center">
          <canvas ref={canvasRef} width={600} height={400} style={{ border: '1px solid #ccc' }} />
        </Box>
      )}
    </Box>
  );
};

export default MoodChart;
