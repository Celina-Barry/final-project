import React, { useState, useEffect } from 'react';
//import ReactDOM from 'react-dom';
//import { UserProvider } from './UserContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './Homepage';
import SingleCampaignPage from './SingleCampaignPage';
import CreateMeeting from './CreateMeeting';
import Header from './Header';
import Login from './Login';
import MeetingConfirmation from './MeetingConfirmation';
import UpdateCredentialsForm from './UpdateCredentials';
import PastMeetingsPage from './PastMeetingsPage';
import SinglePastMeeting from './SinglePastMeeting';
import SignUp from './SignUp';
import GlobalStyles from './GlobalStyles';


const App = () => {


  return (
    
  <Router>
  <GlobalStyles />
    <Header /> 
    <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/meetings/:meetingId" element={<SingleCampaignPage />} />
          <Route path="/" element={<Homepage />} /> 
          <Route path="/pastmeetings" element={<PastMeetingsPage />} /> 
          <Route path="/pastmeeting/:meetingId" element={<SinglePastMeeting />} /> 
          <Route path="/createmeeting" element={<CreateMeeting />} />
          <Route path="/meetingcreated" element={<MeetingConfirmation />} />
          <Route path="/updatecredentials" element={<UpdateCredentialsForm />} />
          <Route path="/signupnewuser" element={<SignUp />} />

      </Routes>
    
  </Router>
    );
  }
export default App;
