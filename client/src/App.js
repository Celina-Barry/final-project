import React, { useState, useEffect } from 'react';
//import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './Homepage';
import SingleCampaignPage from './SingleCampaignPage';
import CreateMeeting from './CreateMeeting';
import Header from './Header';
import Login from './Login';




function App() {



  return (
    
  <Router>
    
    <Header /> 
    <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/campaign/:campaignId" element={<SingleCampaignPage />} />
          <Route path="/" element={<Homepage />} /> 
          <Route path="/createmeeting" element={<CreateMeeting />} />
      </Routes>
    
  </Router>
    );
  }
export default App;
