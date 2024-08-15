import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
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
import Dashboard from './components/User-Dashboard/Dashboard';
import MentalHealthMonitoring from './components/MentalHealthMonitoring';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import './App.css';
import ChatPage from './components/Chatbot/ChatPage';

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
      <GlobalStyle />
      <Header />
      <Routes>
        <Route path="/" element={<Introduction />} />
        <Route path="/mood-tracking" element={<MoodTracking />} />
        <Route path="/journaling" element={<Journaling />} />
        <Route path="/therapy-scheduling" element={<TherapyScheduling />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/newpage" element={<NewPage />} />
        <Route path="/mentalhealthmonitoring" element={<MentalHealthMonitoring />} />
        <Route path="/dashboard/:type" element={<Dashboard />} />
      </Routes>
      {isHomePage && <Services />}
      {isHomePage && <Testimonials />}
      <Footer />
    </>
  );
}

const MainApp = () => (
  <Router>
    <App />
  </Router>
);

export default MainApp;
