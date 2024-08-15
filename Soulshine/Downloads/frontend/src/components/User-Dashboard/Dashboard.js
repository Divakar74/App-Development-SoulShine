// Dashboard.js
import React from 'react';
import { useParams } from 'react-router-dom';
import IndividualDashboard from './IndividualDashboard';
import CoupleDashboard from './CoupleDashboard';
import TeenagerDashboard from './TeenagerDashboard';

const Dashboard = () => {
  const { type } = useParams(); // Assuming you're using React Router

  const renderDashboard = () => {
    switch (type) {
      case 'individual':
        return <IndividualDashboard />;
      case 'couple':
        return <CoupleDashboard />;
      case 'teen':
        return <TeenagerDashboard />;
      default:
        return <div>Select a valid therapy type</div>;
    }
  };

  return (
    <div>
      {renderDashboard()}
    </div>
  );
};

export default Dashboard;
