import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import styled from 'styled-components';

const MeetingConfirmation = () => {
    const formatDate = (isoString) => {
        const date = new Date(isoString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString(undefined, options);
    };
    
    const formatTime = (isoString) => {
        const date = new Date(isoString);
        const options = { hour: '2-digit', minute: '2-digit' };
        return date.toLocaleTimeString(undefined, options);
    };
    const location = useLocation();
    const meetingDetails = location.state.meetingDetails;

    return (
        <ConfirmationWrapper>
            <h1>Your meeting is created!</h1>
            <MeetingDetails>
                <DetailItem>
                    <DetailLabel>Topic:</DetailLabel>
                    <DetailValue>{meetingDetails.topic}</DetailValue>
                    <DetailLabel>Agenda:</DetailLabel>
                    <DetailValue>{meetingDetails.agenda}</DetailValue>
                    <DetailLabel>Date:</DetailLabel>
                    <DetailValue>{formatDate(meetingDetails.start_time)}</DetailValue>
                    <DetailLabel>Time:</DetailLabel>
                    <DetailValue>{formatTime(meetingDetails.start_time)}</DetailValue>
                    <DetailLabel>Timezone:</DetailLabel>
                    <DetailValue>{meetingDetails.timezone}</DetailValue>
                </DetailItem>
            </MeetingDetails>
                <ButtonsContainer>
                    <Link to="/">
                        <Button>View All Meetings</Button>
                    </Link>
                    <Link to={`/meetings/${meetingDetails.id}`}>
                        <Button>Edit This Meeting</Button>
                    </Link>
                </ButtonsContainer>
        </ConfirmationWrapper>
    );
};

// Styled components
const ConfirmationWrapper = styled.div`
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
    width: 80%;
    margin: 40px auto;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    background-color: #f9f9f9;
`;

const MeetingDetails = styled.div`
    margin-top: 20px;
`;

const DetailItem = styled.div`
    display: flex;
    margin: 10px 0;
`;

const DetailLabel = styled.div`
    flex: 0 0 50px;
    font-weight: bold;
    padding: 5px;
`;

const DetailValue = styled.div`
    flex: 1;
    padding: 5px;
`;
const ButtonsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
`;

const Button = styled.button`
    padding: 10px 20px;
    border-radius: 5px;
    border: none;
    background-color: #007BFF; 
    color: white;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: #0056b3;
    }
`;

export default MeetingConfirmation;
