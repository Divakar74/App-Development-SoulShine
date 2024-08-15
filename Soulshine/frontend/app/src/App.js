import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import DashboardHeader from './components/User-Dashboard/individualdashboard/DashboardHeader';  
import Footer from './components/Footer';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import GlobalStyle from './components/GlobalStyle';
import Introduction from './components/Introduction';
import MoodTracking from './components/MoodTracking';
import Journaling from './components/User-Dashboard/Journaling';
import TherapyScheduling from './components/User-Dashboard/TherapyScheduling';
import Login from './components/Login';
import SignUp from './components/SignUp';
import NewPage from './components/NewPage';
import MentalHealthMonitoring from './components/MentalHealthMonitoring';
import UserProfilePage from './components/User-Dashboard/individualdashboard/UserProfilePage';
import SettingsPage from './components/User-Dashboard/individualdashboard/SettingsPage';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import './App.css';
import Dashboard from './components/User-Dashboard/Dashboard';
import ChatPage from './components/Chatbot/ChatPage';
import Sample from './Sample';
import GeminiAIPage from './GeminiAIPage';
import CoupleDashboard from './components/User-Dashboard/coupledashboard/CoupleDashboard';
import Features from './components/Features';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import NewsletterGenerator from './components/User-Dashboard/individualdashboard/NewsletterGenerator';
import { GoogleOAuthProvider } from '@react-oauth/google';
import MentalHealthBox from './components/MentalHealthBox';
import ArticlesBox from './components/ArticlesBox';
import { Typography } from '@mui/material';
import ContactUsPage from './components/ContactUsPage';
import { UserProvider } from './components/UserContext';

function App() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isSpecialPage = location.pathname === '/newpage' || location.pathname === '/mentalhealthmonitoring';
  const isDashboardPage = location.pathname.startsWith('/dashboard');

  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  const handleSend = async () => {
    if (message.trim() === '') return;

    const newChat = [...chat, { type: 'user', text: message }];
    setChat(newChat);
    setMessage('');

    try {
      const response = await axios.post('http://localhost:5000/predict', { message });
      setChat([...newChat, { type: 'bot', text: response.data.response }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setChat([...newChat, { type: 'bot', text: 'Error communicating with the server.' }]);
    }
  };

  return (
    <>
    <UserProvider>
      <GlobalStyle />
      <GoogleOAuthProvider clientId="1085456836218-iffursvg3notijit9pc27a2jlk8p4ert.apps.googleusercontent.com">
        <Auth0Provider
          domain={process.env.REACT_APP_AUTH0_DOMAIN}
          clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
          redirectUri={window.location.origin}
        >
          {isDashboardPage ? <DashboardHeader /> : <Header />}
          <Routes>
            <Route path="/" element={<Introduction />} />
            <Route path="/features" element={<Features />} />
            <Route path="/mood-tracking" element={<MoodTracking />} />
            <Route path="/journaling" element={<Journaling />} />
            <Route path="/therapy-scheduling" element={<TherapyScheduling />} />
            <Route path="/contact" element={<ContactUsPage/>}/>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/newpage" element={<NewPage />} />
            <Route path="/mentalhealthmonitoring" element={<MentalHealthMonitoring />} />
            <Route path="/dashboard/:type" element={<Dashboard />} />
            {/* <Route path="/user-profile" element={<UserProfilePage />} /> */}
            <Route path="/settings" element={<UserProfilePage />} />
            <Route path="/chatpage" element={<ChatPage />} />
            <Route path="/couples-dashboard" element={<CoupleDashboard />} />  
            <Route path="/newsletter" element={<NewsletterGenerator />} />
          </Routes>
          {(isHomePage || isSpecialPage) && <MentalHealthBox />}

{/* {isHomePage && (
  <Typography
    variant='h6'
    style={{
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 'bold',
      textAlign: 'center',  // Center the text horizontally
      margin: '0 auto',     // Center the title within its container
    }}
  >
    Articles
  </Typography>
)} */}

{(isHomePage || isSpecialPage) && <ArticlesBox />}
{(isHomePage || isSpecialPage) && <Testimonials />}

          <Footer />
        </Auth0Provider>
      </GoogleOAuthProvider>
      </UserProvider>
    </>
  );
}

const MainApp = () => (
  <Router>
    <App />
  </Router>
);

export default MainApp;
