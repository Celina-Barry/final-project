import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import InputField from './InputField';
//import { useUserContext } from './UserContext';
import moment from 'moment';
// export const UserContext = React.createContext();

// export const useUserContextAlt = () => {
//     return useContext(UserContext);
// };

//const UserContext = React.createContext({ loginEmail: "celina.barry@gmail.com" });

const CreateMeeting = () => {
    const loginEmail = localStorage.getItem('loginEmail');
    //const { loginEmail } = useContext(useUserContext)
    const [formData, setFormData] = useState({});
     const [zoomMeetingId, setZoomMeetingId] = useState('');
    const [zoomAccessToken, setZoomAccessToken] = useState('');

    const TIMEZONES = [
        "Pacific/Midway",
"Pacific/Pago_Pago",
"Pacific/Honolulu",
"America/Anchorage",
"America/Vancouver",
"America/Los_Angeles",
"America/Tijuana",
"America/Edmonton",
"America/Denver",
"America/Phoenix",
"America/Mazatlan",
"America/Winnipeg",
"America/Regina",
"America/Chicago",
"America/Mexico_City",
"America/Guatemala",
"America/El_Salvador",
"America/Managua",
"America/Costa_Rica",
"America/Montreal",
"America/New_York",
"America/Indianapolis",
"America/Panama",
"America/Bogota",
"America/Lima",
"America/Halifax",
"America/Puerto_Rico",
"America/Caracas",
"America/Santiago",
"America/St_Johns",
"America/Montevideo",
"America/Araguaina",
"America/Argentina/Buenos_Aires",
"America/Godthab",
"America/Sao_Paulo",
"Atlantic/Azores",
"Canada/Atlantic",
"Atlantic/Cape_Verde",
"UTC",
"Etc/Greenwich",
"Europe/Belgrade",
"CET",
"Atlantic/Reykjavik",
"Europe/Dublin",
"Europe/London",
"Europe/Lisbon",
"Africa/Casablanca",
"Africa/Nouakchott",
"Europe/Oslo",
"Europe/Copenhagen",
"Europe/Brussels",
"Europe/Berlin",
"Europe/Helsinki",
"Europe/Amsterdam",
"Europe/Rome",
"Europe/Stockholm",
"Europe/Vienna",
"Europe/Luxembourg",
"Europe/Paris",
"Europe/Zurich",
"Europe/Madrid",
"Africa/Bangui",
"Africa/Algiers",
"Africa/Tunis",
"Africa/Harare",
"Africa/Nairobi",
"Europe/Warsaw",
"Europe/Prague",
"Europe/Budapest",
"Europe/Sofia",
"Europe/Istanbul",
"Europe/Athens",
"Europe/Bucharest",
"Asia/Nicosia",
"Asia/Beirut",
"Asia/Damascus",
"Asia/Jerusalem",
"Asia/Amman",
"Africa/Tripoli",
"Africa/Cairo",
"Africa/Johannesburg",
"Europe/Moscow",
"Asia/Baghdad",
"Asia/Kuwait",
"Asia/Riyadh",
"Asia/Bahrain",
"Asia/Qatar",
"Asia/Aden",
"Asia/Tehran",
"Africa/Khartoum",
"Africa/Djibouti",
"Africa/Mogadishu",
"Asia/Dubai",
"Asia/Muscat",
"Asia/Baku",
"Asia/Kabul",
"Asia/Yekaterinburg",
"Asia/Tashkent",
"Asia/Calcutta",
"Asia/Kathmandu",
"Asia/Novosibirsk",
"Asia/Almaty",
"Asia/Dacca",
"Asia/Krasnoyarsk",
"Asia/Dhaka",
"Asia/Bangkok",
"Asia/Saigon",
"Asia/Jakarta",
"Asia/Irkutsk",
"Asia/Shanghai",
"Asia/Hong_Kong",
"Asia/Taipei",
"Asia/Kuala_Lumpur",
"Asia/Singapore",
"Australia/Perth",
"Asia/Yakutsk",
"Asia/Seoul",
"Asia/Tokyo",
"Australia/Darwin",
"Australia/Adelaide",
"Asia/Vladivostok",
"Pacific/Port_Moresby",
"Australia/Brisbane",
"Australia/Sydney",
"Australia/Hobart",
"Asia/Magadan",
"SST",
"Pacific/Noumea",
"Asia/Kamchatka",
"Pacific/Fiji",
"Pacific/Auckland",
"Asia/Kolkata",
"Europe/Kiev",
"America/Tegucigalpa",
"Pacific/Apia"
    ];
    // useEffect(() => {
    //     fetchAccessToken();
    // }, []);
    // const fetchAccessToken = async () => {
    //     try {
    //         const tokenUrl = `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=accountId`;
    //         const response = await fetch(tokenUrl, {
    //             method: 'POST',
    //             headers: {
    //                 'Authorization': 'Basic base64(clientId:clientSecret)',
    //                 'Content-Type': 'application/json',
    //             },
    //         });

    //         const tokenData = await response.json();
    //         setZoomAccessToken(tokenData.access_token);
    //     } catch (error) {
    //         console.error('Error fetching Zoom access token:', error);
    //     }
    // };
    


    const handleChange = (key, value) => {
        setFormData({
            ...formData,
            [key]: value
        });
    };

    const handleSubmit = async (e, data) => {
        e.preventDefault();

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
                // Handle the response data as needed
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