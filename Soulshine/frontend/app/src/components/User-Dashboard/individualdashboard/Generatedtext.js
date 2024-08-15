import React from 'react';
import { Box, Typography } from '@mui/material';
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const YourComponent = ({ generatedText }) => {
  const parseText = (text) => {
    // Split the text by new lines
    const lines = text.split('\n');

    // Process lines and replace '**' with list icons
    const processedLines = lines.map(line => line.replace(/\*\*/g, '').trim()).filter(line => line);

    // Determine sections and additional titles
    let sections = [];
    let currentSection = '';

    processedLines.forEach(line => {
      if (line.toLowerCase().includes('observations')) {
        sections.push(<Typography variant="h6" sx={{ marginTop: '20px', fontWeight: 'bold' }} key={line}>Observations:</Typography>);
        currentSection = 'Observations';
      } else if (line.toLowerCase().includes('potential underlying issues')) {
        sections.push(<Typography variant="h6" sx={{ marginTop: '20px', fontWeight: 'bold' }} key={line}>Potential Underlying Issues:</Typography>);
        currentSection = 'Potential Underlying Issues';
      } else if (line.toLowerCase().includes('recommendations')) {
        sections.push(<Typography variant="h6" sx={{ marginTop: '20px', fontWeight: 'bold' }} key={line}>Recommendations:</Typography>);
        currentSection = 'Recommendations';
      } else if (currentSection === 'Observations' || currentSection === 'Potential Underlying Issues' || currentSection === 'Recommendations') {
        sections.push(
          <ListItem key={line}>
            <ListItemIcon>
              <CheckCircleIcon />
            </ListItemIcon>
            <ListItemText primary={line} />
          </ListItem>
        );
      } else {
        sections.push(<Typography key={line} sx={{ marginTop: '20px' }}>{line}</Typography>);
      }
    });

    return sections;
  };

  return (
    <Box sx={{ fontFamily: 'Poppins', textAlign: 'left', padding: '20px' }}>
      <Typography variant="body1" sx={{ fontFamily: 'Poppins' }}>
        {generatedText ? (
          <ul>
            {parseText(generatedText)}
          </ul>
        ) : (
          <Typography variant="body1" sx={{ fontFamily: 'Poppins' }}>
            Wait... Generating Response
          </Typography>
        )}
      </Typography>
    </Box>
  );
};

export default YourComponent;
