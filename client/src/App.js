import React, { useState, useEffect } from 'react';
//import ReactDOM from 'react-dom';
import { UserProvider } from './UserContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './Main/Homepage';
import SingleCampaignPage from './Main/SingleCampaignPage';
import CreateMeeting from './Main/CreateMeeting';
import Header from './Header';
import Login from './LoginComponents/Login';
import MeetingConfirmation from './Main/MeetingConfirmation';
import UpdateCredentialsForm from './UpdateCredentials';
import PastMeetingsPage from './PastMeetingComponents/PastMeetingsPage';
import SinglePastMeeting from './PastMeetingComponents/SinglePastMeeting';




function App() {



  return (
    <UserProvider>
  <Router>
    
    <Header /> 
    <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/meetings/:meetingId" element={<SingleCampaignPage />} />
          <Route path="/" element={<Homepage />} /> 
          <Route path="/pastmeetings" element={<PastMeetingsPage />} /> 
          <Route path="/pastmeetings/:meetingId" element={<SinglePastMeeting />} /> 
          <Route path="/createmeeting" element={<CreateMeeting />} />
          <Route path="/meetingcreated" element={<MeetingConfirmation />} />
          <Route path="/updatecredentials" element={<UpdateCredentialsForm />} />

      </Routes>
    
  </Router>
  </UserProvider>
    );
  }
export default App;
