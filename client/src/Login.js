import React, { useContext, useState, useEffect } from "react";
import { useUserContext } from './UserContext';
import { useNavigate } from "react-router-dom";
import styled from "styled-components"
const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    background-color: rgba(255, 255, 255, 0.5);
    padding: 40px;

`;
const Input = styled.input`
    width: 90%;
    padding: 10px;
    border: 0.5px solid black;
    border-radius: 4px;
`;
const LoginButton = styled.button`
    background-color: blue;
    font-family: sans-serif;
    color: white;
    border-style: none;
    width: 100%;
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

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [encodedEmail, setEncodedEmail] = useState('');

    const { loginEmail, updateLoginEmail } = useUserContext();

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
      
          if (!response.ok) {
            console.log("Client response: ", response)
            throw new Error("Server error");
          }
      
          const data = await response.json();
          console.log("Data from server:", data.data.id);
      
          if (data) {
            console.log(data.data);
            updateLoginEmail(data.data.email);
            localStorage.setItem('loginEmail', data.data.email);

            navigate("/");
            // Redirect to homepage, save userid to local storage
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
        <form onSubmit={handleSubmit}>
           
            <Input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your email"/>
            <Input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="your password"/>
            <LoginButton type="submit">Submit</LoginButton>
        </form>
        </FormContainer> 

        </SignInWrapper>
        </StyledSignIn>
    )
}
export default Login;