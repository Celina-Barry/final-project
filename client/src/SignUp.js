import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

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
const Header = styled.h2`
    text-align: center;
    margin-bottom: 20px;
`;

const SignUp = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        zoom_account_id: '',
        client_id: '',
        client_secret: '',
        pw: '',
        confirmNewPassword: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (formData.pw !== formData.confirmNewPassword) {
            alert('Passwords do not match!');
            return;
        }
    
        localStorage.setItem('loginEmail', formData.email);

        try {
            const response = await fetch('/newuser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const responseData = await response.json();
            if (response.ok) {
                

                //alert('Welcome!');
                navigate('/'); 
            } else if (responseData.message) {
                alert(responseData.message);
            } else {
                throw new Error('Failed to update credentials');
            }
    
        } catch (error) {
            console.log("sign up user frontend error: ", error)
            //alert('There was an error creating your user');
        }
    };
    

    return (
        <PageContainer>
            <FormContainer>
                    <Header>Sign Up Here</Header> 
                <Form onSubmit={handleSubmit}>
                <Input
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                    />
                    <Input
                        type="text"
                        placeholder="Account ID"
                        value={formData.zoom_account_id}
                        onChange={(e) => setFormData({ ...formData, zoom_account_id: e.target.value })}
                        required
                    />
                    <Input
                        type="text"
                        placeholder="Client ID"
                        value={formData.client_id}
                        onChange={(e) => setFormData({ ...formData, client_id: e.target.value })}
                        required
                    />
                    <Input
                        type="password"
                        placeholder="Client Secret"
                        value={formData.client_secret}
                        onChange={(e) => setFormData({ ...formData, client_secret: e.target.value })}
                        required
                    />
                    <Input
                        type="password"
                        placeholder="New Password"
                        value={formData.pw}
                        onChange={(e) => setFormData({ ...formData, pw: e.target.value })}
                        required
                    />
                    <Input
                        type="password"
                        placeholder="Confirm New Password"
                        value={formData.confirmNewPassword}
                        onChange={(e) => setFormData({ ...formData, confirmNewPassword: e.target.value })}
                        required
                    />
                    <SubmitButton type="submit">Submit</SubmitButton>
                </Form>
            </FormContainer>
        </PageContainer>
    );
};

export default SignUp;
