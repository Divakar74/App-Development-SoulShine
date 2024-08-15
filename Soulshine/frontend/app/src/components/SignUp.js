import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode'; // Ensure correct import
// import { UserContext } from './UserContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Define styled components
const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f8f9fa;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
`;

const Title = styled.h2`
  margin-bottom: 1rem;
  color: #004d40;
`;

const Input = styled.input`
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 0.75rem;
  margin-top: 1rem;
  background-color: #004d40;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background-color: #00251a;
  }
`;

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  // const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/users', formData);
      console.log('Sign Up Successful', response.data);

      // Update user context
      // setUser({
      //   username: formData.username,
      //   email: formData.email,
      //   password: formData.password, // This is typically not saved in plain text
      // });

      // Show success toast notification
      toast.success('Sign Up Successful!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // Redirect to login page after a delay to let the toast notification show
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      console.error('Error signing up', error);
      toast.error('Sign Up Failed!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleOAuthSuccess = (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse?.credential);
      console.log('OAuth sign-up successful:', decoded);

      setFormData({
        username: decoded.name || '',
        email: decoded.email || '',
        password: ''
      });

      // Update user context
      // setUser({
      //   username: decoded.name || '',
      //   email: decoded.email || '',
      // });

      // Show success toast notification
      toast.success('OAuth Sign Up Successful!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      console.error("OAuth sign-up failed:", error);
      toast.error('OAuth Sign Up Failed!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleOAuthError = () => {
    console.log("OAuth sign-up failed");
    toast.error('OAuth Sign Up Failed!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <SignUpContainer>
      <Form onSubmit={handleSignUp}>
        <Title>Sign Up</Title>
        <Input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <Button type="submit">Sign Up</Button>
        <br />
        <GoogleLogin
          onSuccess={handleOAuthSuccess}
          onError={handleOAuthError}
          style={{ width: '100%', marginTop: '10px' }}
        />
      </Form>
      <ToastContainer />
    </SignUpContainer>
  );
};

export default SignUp;
