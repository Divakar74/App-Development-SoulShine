import React from 'react';
import styled from 'styled-components';
import { Box, Typography, Button } from '@mui/material';
import Checkbox from '@mui/material';
const PopupContainer = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  background-color: #ffffff;
  border: 2px solid #000;
  box-shadow: 24;
  padding: 2rem;
  border-radius: 12px;
`;

const PopupTitle = styled(Typography)`
  font-family: 'Poppins', sans-serif;
  margin-bottom: 1rem;
`;

const PopupContent = styled(Typography)`
  font-family: 'Poppins', sans-serif;
  margin-bottom: 1rem;
`;

const PopupButton = styled(Button)`
  font-family: 'Poppins', sans-serif;
  border-radius: 25px;
`;

const CustomPopup = ({ open, onClose, title, content, onConfirm }) => {
  if (!open) return null;

  return (
    <PopupContainer>
      <PopupTitle variant="h6">{title}</PopupTitle>
      <PopupContent variant="body1">{content}</PopupContent>
      <Box display="flex" justifyContent="flex-end">
        <PopupButton variant="contained" color="primary" onClick={onConfirm}>
          Confirm
        </PopupButton>
        <PopupButton
          variant="outlined"
          color="secondary"
          onClick={onClose}
          style={{ marginLeft: '1rem' }}
        >
          Close
        </PopupButton>
      </Box>
    </PopupContainer>
  );
};

export default CustomPopup;
