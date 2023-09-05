import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import InputField from '../InputField';
import TextArea from '../TextArea';
import { useNavigate } from 'react-router-dom';
import { TIMEZONES } from '../timezones';

//import { useUserContext } from './UserContext';
import moment from 'moment';
// export const UserContext = React.createContext();

// export const useUserContextAlt = () => {
//     return useContext(UserContext);
// };

//const UserContext = React.createContext({ loginEmail: "celina.barry@gmail.com" });

const CreateMeeting = () => {
    const navigate = useNavigate();
    const loginEmail = localStorage.getItem('loginEmail');
    //const { loginEmail } = useContext(useUserContext)
    const [formData, setFormData] = useState({});
     const [zoomMeetingId, setZoomMeetingId] = useState('');
    const [zoomAccessToken, setZoomAccessToken] = useState('');

    const handleChange = (key, value) => {
        setFormData({
            ...formData,
            [key]: value
        });

};

    const handleSubmit = async (e, data) => {
        e.preventDefault();
        const combineDateAndTime = (date, time) => {
            const combinedDateTime = new Date(`${date}T${time}:00Z`);
            return combinedDateTime.toISOString();
        }
            const formattedStartTime = combineDateAndTime(formData.date, formData.time);
            data.start_time = formattedStartTime
            console.log("formatted start time inside handle submit: ", formattedStartTime);
            console.log("meeting agenda: ", data.agenda)
               
        if (data) {
            try {
                const response = await fetch(`/newmeeting/${loginEmail}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                const responseData = await response.json();
                if (response.status === 201) {
                    console.log("Meeting Created Response Data: ", responseData)
                    navigate('/meetingcreated', { state: { meetingDetails: responseData } });
                }
            } catch (error) {
                console.error('Error creating meeting:', error);
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
                 <TextArea
                    type="textarea"
                    name="agenda"
                    placeholder="Meeting Agenda"
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
                <label>
                    Timezone:
                        <select name="timezone" required onChange={e => handleChange("timezone", e.target.value)}>
                            {TIMEZONES.map(tz => (
                                <option key={tz} value={tz}>{tz}</option>
                                ))}
                        </select>
                    </label>
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
    
`;

const ZoomMeetingIdContainer = styled.div`

`;



const StyledTextArea = styled.textarea`
    width: 100%;
    height: 150px;
    resize: none;
`;

const MeetingForm = styled.form`
    border: 1px solid black;
    border-radius: 5px;
    padding: 15px 25px;
    background-color: lightgray;
    display: flex;
    flex-direction: column;
    gap: 15px;
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