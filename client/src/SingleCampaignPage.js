import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import moment from 'moment';

import { TIMEZONES } from './ZoomTimezones';

const SingleCampaignContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;
    width: 100%;
    margin: 0 auto;
    padding: 20px;
`;

const FormContainer = styled.div`
    flex: 1;
    padding: 20px;
    box-shadow: var(--box-shadow);
    border-radius: 5px;
    max-width: 400px;
`;
const FormHeading = styled.h2`
    font-size: 1.5rem;
    text-align: center;
    margin-bottom: 10px;
    color: var(--secondary-color);
    `;
const ActionHeading = styled.h3`
    text-align: center;
    margin-bottom: 10px;
    color: var(--secondary-color);
`;
const ActionContainer = styled.div`
    flex: 1;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    align-items: flex-start;
    box-shadow: 0px 2px 5px rgba(0,0,0,0.1);
    border-radius: 5px;       
`;
const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

const Textarea = styled.textarea`
    width: 90%;
    height: 150px;
    resize: none;
`;

const ActionButton = styled.button`
    margin: 15px 0;
`;
const GetInvitationButton = styled.button`
    margin: 15px 0;
`;


const SingleCampaignPage = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    const [showInvitationPopup, setShowInvitationPopup] = useState(false);
    const [meetingInvitation, setMeetingInvitation] = useState(null);
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
        }
    };
    const getMeetingInvitation = async () => {
      
            const loginEmail = localStorage.getItem('loginEmail');
            console.log("loginEmail: ", loginEmail, "meedingId: ", meetingId)
                try {
                    const response = await fetch(`/meetinginvitation/${meetingId}/${loginEmail}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        }
                        
                    });
    
                    
                    if (!response.ok) {

                        //console.log("Meeting updated Response Data: ", responseData)
                        //window.alert("Meeting successfully deleted");
                        throw new Error('failed to get meeting invite');
                    }
                    const responseData = await response.json();  
                    setMeetingInvitation(responseData);
                    
                } catch (error) {
                    console.error('Error fetching meeting invitation: ', error);
                }
            };

    const confirmDelete = async (shouldDelete) => {
        if (shouldDelete) {
            setShowPopup(true);
            setPopupMessage("Deleting...")
        }
        const loginEmail = localStorage.getItem('loginEmail');
        console.log("loginEmail: ", loginEmail, "meedingId: ", meetingId)
            try {
                const response = await fetch(`/deletemeeting/${meetingId}/${loginEmail}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                    
                });

                const responseData = await response.text();
                if (response.text) {
                    //console.log("Meeting updated Response Data: ", responseData)
                    //window.alert("Meeting successfully deleted");
                    setPopupMessage("Your meeting has been successfully deleted");

                } else {
                    console.error("Error from server: ", responseData)
                    setPopupMessage("Failed to delete the meeting.");
                }
            } catch {
                setShowPopup(false);
            }
        };
    let formattedDateTime;
    if (meetingData && meetingData.start_time) {
        formattedDateTime = moment(meetingData.start_time).format('YYYY-MM-DDTHH:mm');
        console.log("Formatted start time: ", formattedDateTime)
    }

    const copyToClipboard = () => {
        const textArea = document.createElement("textarea");
        textArea.value = meetingInvitation.invitation;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
    
        try {
            const successful = document.execCommand('copy');
            if (successful) {
                alert('Copied to clipboard!');
            } else {
                alert('Failed to copy text.');
            }
        } catch (err) {
            alert('Unable to copy text');
        }
    
        document.body.removeChild(textArea);
    };
    console.log("meetingData check: ", meetingData);

    return (
        <SingleCampaignContainer>
            <FormContainer>
                <FormHeading>Use the form below to update </FormHeading>
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
            <ActionHeading>Meeting Options</ActionHeading>

                <a href={meetingData ? meetingData.join_url : '#'} target="_blank" rel="noopener noreferrer">
                    <ActionButton>Join Meeting</ActionButton>
                </a>
                <a href={meetingData ? meetingData.start_url : '#'} target="_blank" rel="noopener noreferrer">
                    <ActionButton>Start Meeting</ActionButton>
                </a>
                <ActionButton 
                    onClick={() => {
                        setShowPopup(true);
                        setPopupMessage("Are you sure you want to delete this meeting?");
                            }}
                    >
                        Delete Meeting
                    </ActionButton>
                    <ActionButton onClick={() => {
                        getMeetingInvitation();
                        setShowInvitationPopup(true);
                        }}>Get Meeting Invitation
                    </ActionButton>
            </ActionContainer>

            {showPopup && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <div style={{
                        backgroundColor: '#fff',
                        padding: '20px',
                        borderRadius: '5px',
                        width: '300px',
                        textAlign: 'center',
                    }}>
                        <p>{popupMessage}</p>
                        {popupMessage === "Your meeting has been successfully deleted" && (
                            <>
                                <ActionButton onClick={() => navigate("/")}>
                                    Return to Homepage
                                </ActionButton>
                            </>
                        )}

                        {popupMessage === "Are you sure you want to delete this meeting?" && (
                            <>
                                <ActionButton onClick={() => confirmDelete(true)}>Yes</ActionButton>
                                <ActionButton onClick={() => confirmDelete(false)}>No</ActionButton>
                            </>
                        )}
                    </div>
                </div>
            )}
            {showInvitationPopup && meetingInvitation && (
    <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }}>
        <div style={{
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '5px',
            width: '600px', // adjust as needed
            textAlign: 'left',
        }}>
            <span style={{float: 'right', cursor: 'pointer'}} onClick={() => setShowInvitationPopup(false)}>X</span>
            <pre>{meetingInvitation.invitation}</pre>
            <ActionButton onClick={copyToClipboard}>Copy to Clipboard</ActionButton>
        </div>
    </div>
)}
        </SingleCampaignContainer>
    );
};

export default SingleCampaignPage;
