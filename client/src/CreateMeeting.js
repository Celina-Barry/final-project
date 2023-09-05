import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import InputField from './InputField';
import TextArea from './TextArea';
import { useNavigate } from 'react-router-dom';
import { TIMEZONES } from './ZoomTimezones';

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
            <FormContainer>
            <FormHeading>Use the form below to create a meeting </FormHeading>

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
            </FormContainer>  
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
const FormContainer = styled.div`
    flex: 1;
    padding: 20px;
    box-shadow: var(--box-shadow);
    border-radius: 5px;
    max-width: 400px;
    `;


const ZoomAccessTokenContainer = styled.div`
    margin-top: 20px;
    padding: 15px;
    background-color: var(--background-color);
    border-radius: 5px;
    width: 100%;
`;

const ZoomMeetingIdContainer = styled(ZoomAccessTokenContainer)``;

const MeetingForm = styled.form`
    border: 1px solid var(--border-color);
    border-radius: 5px;
    
    background-color: var(--background-color);
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
`;
const FormHeading = styled.h2`
    font-size: 1.5rem;
    text-align: center;
    margin-bottom: 10px;
    color: var(--secondary-color);
    `;
// const InputContainer = styled.div`
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     width: 100%;
//     padding: 5px;
// `;

const SubmitButton = styled.button`
    color: var(--font-color);
    background-color: var(--secondary-color);
    padding: 10px 30px;
    border: none;
    border-radius: 5px;
    transition: var(--transition);

    &:hover {
        background-color: var(--hover-color);
        cursor: pointer;
    }

    &:disabled {
        color: var(--disabled-color);
        background-color: var(--background-color);
    }

    &:disabled:hover {
        background-color: var(--background-color);
    }
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 60px);
    padding: 30px;
`;

export default CreateMeeting;