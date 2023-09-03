"use strict";
const axios = require('axios');
const qs = require('qs');

const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const getMeetings = async (req, res) => {
    console.log("get Meetings function called");
    
    const MONGO_URI = "mongodb+srv://celinabarry:8Y9DQAAzsIUqHWXr@cluster0.e9wwre8.mongodb.net/?retryWrites=true&w=majority";
    console.log("MONGO_URI: ", MONGO_URI);
    
    const { email } = req.params;
   
    console.log("Email parameter:", email);
;
    
    const client = new MongoClient(MONGO_URI, options);
    
    try {
        await client.connect();
        const db = client.db('final-project');
        
        // Retrieve user's data from MongoDB
        const user = await db.collection('users').findOne({ "email": email });
        console.log("user: ", user)
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const { zoom_user_id, zoom_token } = user;

        const zoomApiUrl = `https://api.zoom.us/v2/users/${zoom_user_id}/meetings`;
        const zoomApiHeaders = {
            'Authorization': `Bearer ${zoom_token}`,
            'Content-Type': 'application/json',
        };

        const response = await axios.get(zoomApiUrl, {
            headers: zoomApiHeaders,
        });

        const zoomData = response.data;
        return res.status(201).json(zoomData);
    } catch (error) {
        console.error('Error getting Zoom meetings:', error);
        return res.status(500).json({ message: 'Error getting Zoom meeting' });
    } finally {
        client.close();
    }
};


const createMeeting = async (req, res) => {
    console.log("Meeting function called");
    
    const MONGO_URI = "mongodb+srv://celinabarry:8Y9DQAAzsIUqHWXr@cluster0.e9wwre8.mongodb.net/?retryWrites=true&w=majority";
    console.log("MONGO_URI: ", MONGO_URI);
    
    const { email } = req.params;
    const { topic, agenda, start_time, timezone } = req.body;
    console.log("Email parameter:", email);
    console.log("form body", req.body);
    
    const client = new MongoClient(MONGO_URI, options);
    
    try {
        await client.connect();
        const db = client.db('final-project');
        
        // Retrieve user's data from MongoDB
        const user = await db.collection('users').findOne({ "email": email });
        console.log("user: ", user)
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const { zoom_user_id, zoom_token } = user;

        const zoomApiUrl = `https://api.zoom.us/v2/users/${zoom_user_id}/meetings`;
        const zoomApiHeaders = {
            'Authorization': `Bearer ${zoom_token}`,
            'Content-Type': 'application/json',
        };
        const zoomMeetingData = {
            topic,
            agenda,
            start_time,
            timezone,
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

        const response = await axios.post(zoomApiUrl, zoomMeetingData, {
            headers: zoomApiHeaders,
        });

        const zoomData = response.data;
        return res.status(201).json(zoomData);
    } catch (error) {
        console.error('Error creating Zoom meeting:', error);
        return res.status(500).json({ message: 'Error creating Zoom meeting' });
    } finally {
        client.close();
    }
};


const getUserByEmail = async (req, res) => {
    console.log("get user by email Handler function called");
    const MONGO_URI = "mongodb+srv://celinabarry:8Y9DQAAzsIUqHWXr@cluster0.e9wwre8.mongodb.net/?retryWrites=true&w=majority"
    console.log("MONGO_URI: ", MONGO_URI)
    const client = new MongoClient(MONGO_URI, options);
    const { email } = req.params;
    console.log("Email parameter:", email);

    
    try{
        await client.connect();
        console.log("Connected to MongoDB");
        const db = client.db('final-project');
        const result = await db.collection('users').findOne({ "email": email });
        console.log("Query result:", result);
            
            if (result) {
                const {
                    zoom_account_id: ZOOM_ACCOUNT_ID,
                    client_id: ZOOM_CLIENT_ID,
                    client_secret: ZOOM_CLIENT_SECRET
                } = result;

                const tokenResponse = await getToken(ZOOM_ACCOUNT_ID, ZOOM_CLIENT_ID, ZOOM_CLIENT_SECRET);

                if(tokenResponse.access_token) {
                    await db.collection('users').updateOne(
                        { _id: result._id},
                        { $set: { "zoom_token": tokenResponse.access_token } }
                    );
                    res.status(200).json({ status: 200, data: { ...result, zoom_token: tokenResponse.access_token } });
                } else {
                    res.status(500).json({ status: 500, message: 'Unable to fetch or update Zoom token' });
                }
            } else {
                console.log("result: ", result)
                res.status(404).json({ status: 404, message: 'user not found' });
            }
        
        
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        res.status(500).json({ status: 500, message: err.message });
    } finally {
        client.close();
    } 
};
const getToken = async (zoom_account_id, client_id, client_secret) => {
    console.log("getTokenCalled: ", "zoom_account_id: ", zoom_account_id, "client_id: ", client_id, "client_secret: ", client_secret)
    try {
        const ZOOM_OAUTH_ENDPOINT = 'https://zoom.us/oauth/token';

        const request = await axios.post(
            ZOOM_OAUTH_ENDPOINT,
            qs.stringify({ grant_type: 'account_credentials', account_id: zoom_account_id }),
            {
                headers: {
                    Authorization: `Basic ${Buffer.from(`${client_id}:${client_secret}`).toString(`base64`)}`,

                }
            }
            
        );
        console.log("Token Request Response:", request.data);
        const { access_token, expires_in } = await request.data;
        
        return { access_token, expires_in, error: null };
    } catch (error) {
        console.error("Error fetching token:", error);

        return { access_token: null, expires_in: null, error }
    }
};
const createUser = async (req, res) => {
    console.log("MONGO_URI:", MONGO_URI);
    const client = new MongoClient(MONGO_URI, options);  
      
      try {
        await client.connect();
  
      const db = client.db("final-project");

      await db.collection("users").insertOne(req.body);
      return res.status(201).json({ status: 201, data: req.body });
        
      } catch (err) {
        res.status(500).json({ status:500, data: req.body, message: err.message });
        console.log(err.stack);
      } finally {
  
      client.close();
      console.log("disconnected!");
      }
  };
  const updateUser = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    console.log("req body: ", req.body);
    const { email, accountId, clientId, clientSecret } = req.body;
    try {       
        const connect = await client.connect();
        const db = client.db('final-project');

        const userCollection = db.collection('users');
        
        const updateObject = {};
        if (accountId) {
            updateObject.account_id = accountId;
        }
        if (clientId) {
            updateObject.client_Id = clientId;
        }
        if (clientSecret) {
            updateObject.client_secret = clientSecret;
        }

        const updateResult = await userCollection.updateOne({ email: email }, { $set: updateObject });

        if (updateResult.matchedCount === 0) {

            res.status(404).json({ status: 404, message: 'User not found' });
        } else {
    
            res.status(200).json({ status: 200, message: 'User updated successfully' });
        }
        
    } catch (err) {
        res.status(500).json({ status: 500, message: err.message });
    } finally {
        client.close();
    }
};


module.exports = {
    getUserByEmail,
    createUser,
    updateUser,
    createMeeting,
    getMeetings
};