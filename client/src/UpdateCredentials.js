import React, { useState, useEffect } from 'react';
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
   
    padding: 20px;
    box-shadow: var(--box-shadow);
    border-radius: 5px;
    height: 500px;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    gap: 25px;
    margin: 20px;
    background-color: var(--celeste);
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;
const FormHeading = styled.h2`
    font-size: 1.5rem;
    text-align: center;
    margin-bottom: 5px;
    color: var(--secondary-color);
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
    background-color: var(--rose-red);
    color: white;
    cursor: pointer;
    margin-top: 10px;
    
    &:hover {
        background-color: var(--dodger-blue)
            }
`;

const HomePageButton = styled(SubmitButton)`
    background-color: var(--rose-red);

    &:hover {
        background-color: var(--dodger-blue);
    }
`;

const UpdateCredentialsForm = () => {
    useEffect(() => {
        const fetchData = async () => {
            try {
                const loginEmail = localStorage.getItem('loginEmail');
                const response = await fetch(`/users/${loginEmail}`);
                const result = await response.json();
    
                if (result && result.status === 200) {
                    setUserData(result.data);
                    // Update form data with existing values
                    setFormData({
                        ...formData,
                        account_id: result.data.zoom_account_id || '',
                        client_id: result.data.client_id || '',
                        client_secret: result.data.client_secret || ''
                    });
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
    
        fetchData();
    }, []);

    const [userData, setUserData] = useState({});

    const [formData, setFormData] = useState({
        account_id: '',
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
            <FormHeading>Edit Credentials </FormHeading>
                <Form onSubmit={handleSubmit}>
                    <Input
                        type="text"
                        placeholder="Account ID"
                        value={formData.account_id}
                        onChange={(e) => setFormData({ ...formData, account_id: e.target.value })}
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
            <HomePageButton onClick={() => window.location.href = '/'}>Back to Homepage</HomePageButton>
        </PageContainer>
    );
};

export default UpdateCredentialsForm;
