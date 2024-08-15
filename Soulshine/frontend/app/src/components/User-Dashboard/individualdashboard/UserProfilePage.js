import React, { useContext } from 'react';
import styled from 'styled-components';
import { UserContext } from '../../UserContext'; // Assuming UserContext is already set up

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  margin-top:40px;
  font-family: 'Poppins', sans-serif;
`;

const ProfileCard = styled.div`
  width: 100%;
  max-width: 600px;
  background: #ffffff;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
`;

const ProfileTitle = styled.h2`
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  color: #004d40;
  margin-bottom: 20px;
`;

const ProfileDetail = styled.p`
  margin: 10px 0;
  font-size: 16px;
  color: #333;
`;

const MoodReportContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin-top: 20px;
`;

const MoodReportTitle = styled.h3`
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  color: #007bff;
  margin-bottom: 20px;
`;

const MoodReportCard = styled.div`
  background: #f8f9fa;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const MoodReportItem = styled.p`
  margin: 5px 0;
  font-size: 14px;
  color: #555;
`;

const UserProfile = () => {
  const { user } = useContext(UserContext); // Assuming user is available from UserContext
  const moodReports = [
    // Sample data for mood reports; this should come from your backend or context
    { date: '2024-08-13', mood: 'Happy', notes: 'Feeling great today!' },
    { date: '2024-08-12', mood: 'Anxious', notes: 'A bit worried about work.' },
    { date: '2024-08-11', mood: 'Calm', notes: 'A relaxing day overall.' },
  ];

  return (
    <ProfileContainer>
      <ProfileCard>
        <ProfileTitle>User Profile</ProfileTitle>
        {/* <ProfileDetail><strong>Username:</strong> {user?.username || 'N/A'}</ProfileDetail> */}
        <ProfileDetail><strong>Email:</strong> {user?.email || 'N/A'}</ProfileDetail>
        <ProfileDetail><strong>ID:</strong> {user?.id || 'N/A'}</ProfileDetail>
      </ProfileCard>

      <MoodReportContainer>
        <MoodReportTitle>Mood Reports</MoodReportTitle>
        {moodReports.map((report, index) => (
          <MoodReportCard key={index}>
            <MoodReportItem><strong>Date:</strong> {report.date}</MoodReportItem>
            <MoodReportItem><strong>Mood:</strong> {report.mood}</MoodReportItem>
            <MoodReportItem><strong>Notes:</strong> {report.notes}</MoodReportItem>
          </MoodReportCard>
        ))}
      </MoodReportContainer>
    </ProfileContainer>
  );
};

export default UserProfile;
