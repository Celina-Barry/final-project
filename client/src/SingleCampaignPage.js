import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import moment from 'moment';

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

// Define your styled components

const SingleCampaignPage = () => {
    const { meetingId } = useParams();
    const [meetingData, setMeetingData] = useState(null);
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [deleteSuccess, setDeleteSuccess] = useState(false);

    useEffect(() => {
        const fetchMeetingData = async () => {
            try {
                // Fetch meeting details using the Zoom API
                const response = await fetch(`https://api.zoom.us/v2/meetings/${meetingId}`, {
                    headers: {
                        'Authorization': 'Bearer ZOOM_API_TOKEN',                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch meeting details');
                }

                const data = await response.json();
                setMeetingData(data);
            } catch (error) {
                console.error('Error fetching meeting details:', error);
            }
        };

        fetchMeetingData();
    }, [meetingId]);

    const handleUpdate = async (formData) => {
        try {

            formData.start_time = moment(formData.start_time).toISOString();

            const response = await fetch(`https://api.zoom.us/v2/meetings/${meetingId}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': 'Bearer YOUR_ZOOM_API_TOKEN', 
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to update meeting');
            }

            const updatedData = await response.json();
            setMeetingData(updatedData);
        } catch (error) {
            console.error('Error updating meeting:', error);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`https://api.zoom.us/v2/meetings/${meetingId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ZOOM_API_TOKEN',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete meeting');
            }

            // Redirect here for delete
        } catch (error) {
            console.error('Error deleting meeting:', error);
        }
    };

    return (
        <SingleCampaignContainer>
            <FormContainer>
                <form onSubmit={(e) => { e.preventDefault(); handleUpdate(meetingData); }}>
                    {/* Prepopulate input fields with meeting data */}
                    {meetingData && (
                        <>
                            <input type="text" name="topic" placeholder="Topic" value={meetingData.topic} />
                            <input type="text" name="agenda" placeholder="Agenda" value={meetingData.agenda} />
                            <input type="datetime-local" name="start_time" value={meetingData.start_time} />
                            <input type="text" name="timezone" placeholder="Timezone" value={meetingData.timezone} />

                            <button type="submit">Update Meeting</button>
                        </>
                    )}
                </form>
            </FormContainer>
            <ActionContainer>
                <a href={meetingData ? meetingData.join_url : '#'} target="_blank" rel="noopener noreferrer">
                    <button>Join Meeting</button>
                </a>
                <a href={meetingData ? meetingData.start_url : '#'} target="_blank" rel="noopener noreferrer">
                    <button>Start Meeting</button>
                </a>
                <button onClick={handleDelete}>Delete Meeting</button>
            </ActionContainer>
        </SingleCampaignContainer>
    );
};

export default SingleCampaignPage;
