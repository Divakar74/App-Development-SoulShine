import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { UserContext } from './UserContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f8f9fa;
  margin-left: 20px;
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

const SignUpLink = styled(Link)`
  margin-top: 1rem;
  color: #2d9cdb;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Login = () => {
  const { setUser } = useContext(UserContext); // Use UserContext
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8080/user/login/${email}/${password}`, {});

      if (response.ok) {
        const user = await response.json();

        // Set user information in context
        setUser({
          email: user.email,
          id: user.id, // Assuming the response contains user.id
        });

        // Store email in localStorage if needed
        localStorage.setItem('email', user.email);

        toast.success('Login successful!', { position: "top-center" });
        navigate('/dashboard/individual');
      } else {
        const errorMessage = response.statusText || 'Login failed. Please try again.';
        setError(errorMessage);
        toast.error(errorMessage, { position: "top-center" });
      }
    } catch (error) {
      const errorMessage = 'An error occurred. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage, { position: "top-center" });
    }
  };

  return (
    <LoginContainer>
      <ToastContainer />
      <Form onSubmit={handleLogin}>
        <Title>Login</Title>
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Button type="submit">Login</Button>
        <SignUpLink to="/signup">Don't have an account? Sign Up</SignUpLink>
      </Form>
    </LoginContainer>
  );
};

export default Login;
