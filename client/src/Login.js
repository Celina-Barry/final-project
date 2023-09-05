import React, { useContext, useState, useEffect } from "react";
import { useUserContext } from './UserContext';
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components"
const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 70vh;
    padding: 20px;
`;

const FormContainer = styled.div`
    width: 100%;
    max-width: 500px;
    padding: 20px;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    margin-bottom: 20px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const Input = styled.input`
    margin-bottom: 15px;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
`;

const SubmitButton = styled.button`
    padding: 10px;
    border-radius: 5px;
    border: none;
    background-color: #007BFF;
    color: white;
    cursor: pointer;
    margin-top: 10px;
    
    &:hover {
        background-color: #0056b3;
    }
`;

const LoginButton = styled.button`
    background-color: var(--primary-color);
    justify-content: center;
    font-family: sans-serif;
    color: white;
    border-style: none;
    width: 95%;
    padding: 8px;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 6px;

`;
const SignInWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

`;
const StyledSignIn = styled.div`

  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

`;
const SignUpText = styled.p`
    text-align: center;
    margin-top: 20px;
`;
const Header = styled.h2`
    text-align: center;
    margin-bottom: 20px;
`;
const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [encodedEmail, setEncodedEmail] = useState('');

    //const { loginEmail, updateLoginEmail } = useUserContext();

    useEffect(() => {
      // Encode the email whenever the 'email' state changes
      const encoded = encodeURIComponent(email);
      setEncodedEmail(encoded);
  }, [email]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        //console.log(JSON.stringify({ email: email }));
      
        try {
          const response = await fetch(`/users/${encodedEmail}`, {
            method: "GET",
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
            },
          });
          const data = await response.json();
          console.log("Data from server:", data.data);
      
          if (!response.ok) {
            console.log("Client response: ", response)
            
            //throw new Error("Server error");
            if (data.status === 404 && data.message === 'user not found') {
              window.alert("User not found, please sign up to use this app");
              return;
          }

          throw new Error(data.message || "Server error");
      }
        
      console.log("Data from server:", data.data.id);
          
      if (data) {
            console.log(data.data);
            //updateLoginEmail(data.data.email);
            localStorage.setItem('loginEmail', data.data.email);

            navigate("/");
          }
        } catch (error) {
          console.error(error);
          window.alert(error.message);
        }
      };
      
    return (
        <StyledSignIn>
            <SignInWrapper>
            
            <FormContainer>
            <Header>Login</Header> 
            
              <Form onSubmit={handleSubmit}>
           
            <Input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your email"/>
            <Input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="your password"/>
            <SubmitButton type="submit">Submit</SubmitButton>
            </Form>
            <SignUpText>
            New user? <Link to="/signupnewuser">Sign up here</Link>
          </SignUpText>
        </FormContainer> 
      </SignInWrapper>
      </StyledSignIn>
    )
}
export default Login;