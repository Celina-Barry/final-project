import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const ItemContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
`;

const ItemBox = styled.div`
    border: 1px solid #ddd;
    padding: 20px;
    width: 250px;
    text-align: center;
`;

const ItemName = styled.p`
    font-weight: bold;
    margin-top: 10px;
`;

const ItemLink = styled.a`
    display: inline-block;
    margin-top: 15px;
    padding: 5px 10px;
    background-color: #007bff;
    color: #fff;
    text-decoration: none;
    border-radius: 5px;

    &:hover {
        background-color: #0056b3;
    }
`;

const Campaigns = () => {
    const loginEmail = localStorage.getItem('loginEmail');
    const [meetings, setMeetings] = useState([]);

    useEffect(() => {
        const fetchMeetings = async () => {
            try {
                // Fetch meetings data from Zoom API
                const response = await fetch(`/meetings/${loginEmail}`);
                const data = await response.json();
                if(!data.meetings) {
                    console.error('No meetings data from Zoom API');
                    return;
                }
                setMeetings(data.meetings);
            } catch (error) {
                console.error('Error fetching meetings:', error);
            }
        };

        fetchMeetings();
    }, []);

    return (
        <ItemContainer>
            {meetings.map(meeting => (
                <ItemBox key={meeting.id}>
                    <ItemName>{meeting.topic}</ItemName>
                    <p>Date: {meeting.start_time}</p>
                    <p>Timezone: {meeting.timezone}</p>
                    <ItemLink href={`/meetings/${meeting.id}`}>View Meeting</ItemLink>
                </ItemBox>
            ))}
        </ItemContainer>
    );
};

export default Campaigns;
