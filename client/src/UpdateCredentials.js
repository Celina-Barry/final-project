import React, { useState } from 'react';
import styled from 'styled-components';

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

const HomePageButton = styled(SubmitButton)`
    background-color: #6c757d;

    &:hover {
        background-color: #565e64;
    }
`;

const UpdateCredentialsForm = () => {
    const [formData, setFormData] = useState({
        accountId: '',
        clientId: '',
        clientSecret: '',
        newPassword: '',
        confirmNewPassword: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (formData.newPassword !== formData.confirmNewPassword) {
            alert('Passwords do not match!');
            return;
        }
    
        const loginEmail = localStorage.getItem('loginEmail');
        if (!loginEmail) {
            alert('Email not found in local storage.');
            return;
        }
    
        try {
            const response = await fetch(`/updatecredentials/${loginEmail}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
    
            if (response.ok) {
                alert('Your credentials have been successfully updated.');
            } else {
                throw new Error('Failed to update credentials');
            }
    
        } catch (error) {
            alert('There was an error updating your credentials.');
        }
    };
    

    return (
        <PageContainer>
            <FormContainer>
                <Form onSubmit={handleSubmit}>
                    <Input
                        type="text"
                        placeholder="Account ID"
                        value={formData.accountId}
                        onChange={(e) => setFormData({ ...formData, accountId: e.target.value })}
                        required
                    />
                    <Input
                        type="text"
                        placeholder="Client ID"
                        value={formData.clientId}
                        onChange={(e) => setFormData({ ...formData, clientId: e.target.value })}
                        required
                    />
                    <Input
                        type="password"
                        placeholder="Client Secret"
                        value={formData.clientSecret}
                        onChange={(e) => setFormData({ ...formData, clientSecret: e.target.value })}
                        required
                    />
                    <Input
                        type="password"
                        placeholder="New Password"
                        value={formData.newPassword}
                        onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
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
            <HomePageButton onClick={() => window.location.href = '/'}>Back to Homepage</HomePageButton>
        </PageContainer>
    );
};

export default UpdateCredentialsForm;
