import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';


const Card = styled.div`
  width: 300px;
  margin: 50px auto;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const Button = styled.button`
  display: block;
  margin-top: 20px;
`;

const SinglePastMeeting = () => {
    const navigate = useNavigate();
    //const formattedDateTime = moment("2023-08-23T18:30:00Z").format('YYYY-MM-DDTHH:mm');
    const loginEmail = localStorage.getItem('loginEmail');
    const { meetingId } = useParams();
    const [meetingData, setMeetingData] = useState({});
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [deleteSuccess, setDeleteSuccess] = useState(false);

    useEffect(() => {
        //const loginEmail = localStorage.getItem('loginEmail');
        console.log("loginEmail: ", loginEmail, "meedingId: ", meetingId)    
        const fetchMeetingData = async () => {
            try {
                const response = await fetch(`/pastmeeting/${meetingId}/${loginEmail}`);
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

    const fetchParticipants = async () => {
        try {
            const response = await fetch(`/meetingparticipants/${meetingId}/${loginEmail}`);
            if (!response.ok) {
                throw new Error('Failed to fetch participants');
            }

            const participants = await response.json();
            // Show these participants in a popup or modal
        } catch (error) {
            console.error('Error fetching participants:', error);
        }
    };

    if (!meetingData) {
        return <div>Loading...</div>; // or some loading spinner
    }

    return (
        <Card>
            <h2>{meetingData.topic}</h2>
            <p><strong>Duration:</strong> {meetingData.duration} minutes</p>
            <p><strong>Total minutes:</strong> {meetingData.total_minutes}</p>
            <p><strong>Participant Count:</strong> {meetingData.participants_count}</p>
        
            <Button onClick={fetchParticipants}>See past participants</Button>
            <Button onClick={() => navigate('/pastmeetings')}>Return to past meetings</Button>
        </Card>
    );
};

export default SinglePastMeeting;