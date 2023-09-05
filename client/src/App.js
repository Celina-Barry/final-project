import React, { useState, useEffect } from 'react';
//import ReactDOM from 'react-dom';
import { UserProvider } from './UserContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './Homepage';
import SingleCampaignPage from './SingleCampaignPage';
import CreateMeeting from './CreateMeeting';
import Header from './Header';
import Login from './Login';
import MeetingConfirmation from './MeetingConfirmation';
import UpdateCredentialsForm from './UpdateCredentials';
import PastMeetingsPage from './PastMeetingsPage';




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
          <Route path="/createmeeting" element={<CreateMeeting />} />
          <Route path="/meetingcreated" element={<MeetingConfirmation />} />
          <Route path="/updatecredentials" element={<UpdateCredentialsForm />} />

      </Routes>
    
  </Router>
  </UserProvider>
    );
  }
export default App;
