import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import moment from 'moment';

import { TIMEZONES } from '../timezones';


const SingleCampaignContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
`;

const FormContainer = styled.div`
    flex: 1;
    padding: 20px;
`;

const ActionContainer = styled.div`
    flex: 1;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;
const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

const Textarea = styled.textarea`
    width: 100%;
    height: 150px;
    resize: none;
`;

const ActionButton = styled.button`
    margin: 15px 0;
`;

// Define your styled components

const SingleCampaignPage = () => {
    const navigate = useNavigate();
    //const formattedDateTime = moment("2023-08-23T18:30:00Z").format('YYYY-MM-DDTHH:mm');
    const loginEmail = localStorage.getItem('loginEmail');
    const { meetingId } = useParams();
    const [meetingData, setMeetingData] = useState({
        topic: '',
        agenda: '',
        start_time: '',
        timezone: '',
    });
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [deleteSuccess, setDeleteSuccess] = useState(false);

    useEffect(() => {
        //const loginEmail = localStorage.getItem('loginEmail');
        console.log("loginEmail: ", loginEmail, "meedingId: ", meetingId)    
        const fetchMeetingData = async () => {
            try {
                const response = await fetch(`/meetings/${meetingId}/${loginEmail}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch meeting details');
                }
    
                const meetingData = await response.json();
                setMeetingData(meetingData);
                console.log("meetingData: ", meetingData)
            } catch (error) {
                console.error('Error fetching meeting details:', error);
            }
        };
    
        fetchMeetingData();
    }, [meetingId]);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMeetingData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    

    const handleUpdate = async (e) => {
        e.preventDefault();
        const loginEmail = localStorage.getItem('loginEmail');
        console.log("loginEmail: ", loginEmail, "meedingId: ", meetingId)
        // //const startTime = meetingData.start_time;
        // const combineDateAndTime = (startTime) => {
        //     const combinedDateTime = new Date(`${startTime}:00Z`);
        //     return combinedDateTime.toISOString();
        // }
        //     const formattedStartTime = combineDateAndTime(meetingData.start_time);
            meetingData.start_time = `${meetingData.start_time}:00`
            console.log("before submit meetingData.start_time: ", meetingData.start_time);     
        if (meetingData) {
            try {
                const response = await fetch(`/meetings/${meetingId}/${loginEmail}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(meetingData),
                });

                const responseData = await response.text();
                if (response.text) {
                    //console.log("Meeting updated Response Data: ", responseData)
                    window.alert("Meeting successfully updated");
                } else {
                    console.error("Error from server: ", responseData)
                }
            } catch (error) {
                console.error('Error updating meeting:', error);
            }
        };
    }
    const handleDelete = async () => {
        const loginEmail = localStorage.getItem('loginEmail');
        console.log("loginEmail: ", loginEmail, "meedingId: ", meetingId)
            try {
                const response = await fetch(`/meetings/${meetingId}/${loginEmail}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                    
                });

                const responseData = await response.text();
                if (response.text) {
                    //console.log("Meeting updated Response Data: ", responseData)
                    window.alert("Meeting successfully deleted");
                } else {
                    console.error("Error from server: ", responseData)
                }
            } catch (error) {
                console.error('Error deleting meeting:', error);
            }
        };
    
    let formattedDateTime;
    if (meetingData && meetingData.start_time) {
        formattedDateTime = moment(meetingData.start_time).format('YYYY-MM-DDTHH:mm');
        console.log("Formatted start time: ", formattedDateTime)
    }
    console.log("meetingData check: ", meetingData);
    return (
        <SingleCampaignContainer>
            <FormContainer>
                <StyledForm onSubmit={(e) =>  handleUpdate(e)}>
                    {meetingData && (
                        <>
                            <input type="text" name="topic" placeholder="Topic" value={meetingData.topic} onChange={handleInputChange}  />
                            <Textarea name="agenda" placeholder="Agenda" value={meetingData.agenda} onChange={handleInputChange} />
                            <input type="datetime-local" name="start_time" value={formattedDateTime || ''} onChange={handleInputChange} />
                            <select name="timezone" value={meetingData.timezone} onChange={handleInputChange}>
                                {TIMEZONES.map((zone) => (
                                    <option key={zone} value={zone}>
                                        {zone}
                                    </option>
                                ))}
                            </select>
                            <button type="submit">Update Meeting</button>
                        </>
                    )}
                </StyledForm>
            </FormContainer>
            <ActionContainer>
                <a href={meetingData ? meetingData.join_url : '#'} target="_blank" rel="noopener noreferrer">
                    <ActionButton>Join Meeting</ActionButton>
                </a>
                <a href={meetingData ? meetingData.start_url : '#'} target="_blank" rel="noopener noreferrer">
                    <ActionButton>Start Meeting</ActionButton>
                </a>
                <ActionButton onClick={handleDelete}>Delete Meeting</ActionButton>
            </ActionContainer>
        </SingleCampaignContainer>
    );
    
};
export default SingleCampaignPage;
