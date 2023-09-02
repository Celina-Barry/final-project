import React, { useContext, useState } from "react";
import { useUserContext } from "./UserContext";
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
    background-color: var(--primary-color);
    font-family: var(--heading-font-family);
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
  background-image: url('/images/facespace_bg.jpg');

`;

const Signin = () => {
   
    const { currentUser, updateUser } = useUserContext();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(JSON.stringify({username: username}))
        fetch("/api/signin", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username: username})
        })
            .then((res) => {
            console.log("Res from server:", res);
            return res.json()
    })

            .then((data) => {
                console.log("Data from server:", data.data.id);
                if (data) {
                    updateUser(data.data);
                    navigate("/")
                    //redirect to homepage, save userid to local storage
                }
            })
            .catch((error) => {
                window.alert(error);
            })
    }
    return (
        <StyledSignIn isSignInPage={true}>
            <SignInWrapper>
            {!currentUser && (   
            <FormContainer>
        <form onSubmit={handleSubmit}>
           
            <Input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="your first name"/>
            <LoginButton type="submit">Submit</LoginButton>
        </form>
        </FormContainer> 
            )};
        </SignInWrapper>
        </StyledSignIn>
    )
}
export default Signin;