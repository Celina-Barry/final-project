import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import InputField from './InputField';
import moment from 'moment';

const CreateMeeting = ({ userId }) => {
    const [formData, setFormData] = useState({});
    const [zoomMeetingId, setZoomMeetingId] = useState('');
    const [zoomAccessToken, setZoomAccessToken] = useState('');
    useEffect(() => {
        fetchAccessToken();
    }, []);
    const fetchAccessToken = async () => {
        try {
            const tokenUrl = `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=accountId`;
            const response = await fetch(tokenUrl, {
                method: 'POST',
                headers: {
                    'Authorization': 'Basic base64(clientId:clientSecret)',
                    'Content-Type': 'application/json',
                },
            });

            const tokenData = await response.json();
            setZoomAccessToken(tokenData.access_token);
        } catch (error) {
            console.error('Error fetching Zoom access token:', error);
        }
    };


    const handleChange = (key, value) => {
        setFormData({
            ...formData,
            [key]: value
        });
    };

    const handleSubmit = async (e, data) => {
        e.preventDefault();

        if (data) {
            const zoomApiUrl = `https://api.zoom.us/v2/users/${userId}/meetings`;
            const zoomApiHeaders = {
                'Authorization': `Bearer YOUR_ZOOM_ACCESS_TOKEN`,
                'Content-Type': 'application/json',
            };

            const zoomMeetingData = {
                topic: data.topic,
                agenda: data.agenda,
                start_time: moment(data.date + ' ' + data.time).toISOString(),
                timezone: data.timezone,
                type: 2,
                settings: {
                    allow_multiple_devices: true,
                    alternative_hosts_email_notification: true,
                    auto_recording: "cloud",
                    calendar_type: 1,
                    close_registration: false,
                    email_notification: true,
                    encryption_type: "enhanced_encryption",
                    focus_mode: true,
                    host_video: true,
                    jbh_time: 0,
                    join_before_host: false,      
                    mute_upon_entry: false,
                    participant_video: false,
                    registrants_confirmation_email: true,
                    registrants_email_notification: true,
                    registration_type: 1,
                    show_share_button: true,
                    waiting_room: false,
                    watermark: false
                }
            };

            try {
                const response = await fetch(zoomApiUrl, {
                    method: 'POST',
                    headers: zoomApiHeaders,
                    body: JSON.stringify(zoomMeetingData),
                });

                const zoomData = await response.json();

                setZoomMeetingId(zoomData.id);
            } catch (error) {
                console.error('Error creating Zoom meeting:', error);
            }
        }
    };

    return (
        <Wrapper>
            <InputContainer>
            <MeetingForm onSubmit={(event) => handleSubmit(event, formData)}>

                <InputField
                    type="text"
                    name="topic"
                    placeholder="Meeting Topic"
                    required={true}
                    handleChange={handleChange}
                />
                <InputField
                    type="textarea"
                    name="agenda"
                    placeholder="Agenda"
                    required={true}
                    handleChange={handleChange}
                />
                <InputField
                    type="date"
                    name="date"
                    required={true}
                    handleChange={handleChange}
                />
                <InputField
                    type="time"
                    name="time"
                    required={true}
                    handleChange={handleChange}
                />
                <InputField
                    type="text"
                    name="timezone"
                    placeholder="Timezone"
                    required={true}
                    handleChange={handleChange}
                />
                <SubmitButton type="submit">Create Meeting</SubmitButton>
            </MeetingForm>
            </InputContainer>
            
            {zoomAccessToken && (
                <ZoomAccessTokenContainer>
                    <p>Zoom Access Token: {zoomAccessToken}</p>
                </ZoomAccessTokenContainer>
            )}


            {zoomMeetingId && (
                <ZoomMeetingIdContainer>
                    <p>Zoom Meeting ID: {zoomMeetingId}</p>
                </ZoomMeetingIdContainer>
            )}
        </Wrapper>
    );
};


const ZoomAccessTokenContainer = styled.div`
    /* Your styling for the Zoom access token container */
`;

const ZoomMeetingIdContainer = styled.div`

`;





const MeetingForm = styled.form`
    border: 1px solid black;
    border-radius: 5px;
    padding: 15px, 25px;
    background-color: lightgray;
`;

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 15px 25px;
    padding: 5px;
`;

const SubmitButton = styled.button`
    color: black;
    background-color: white;
    padding: 5px 25px;
    border: 1px solid darkgray;
    border-radius: 5px;
    transition: all 250ms ease;

    &:hover {
        color: white;
        background-color: darkgray;
        cursor: pointer;
    }

    &:disabled {
        color: lightgray;
    }

    &:disabled:hover {
        background-color: white;
    }
`;
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-right: 20px;
`;


const ItemDetails = styled.div`
    margin-left: 20px;
`;


export default CreateMeeting;