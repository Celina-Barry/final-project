"use strict";
const axios = require('axios');
const qs = require('qs');
const moment = require('moment');
const Asana = require('asana');

const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
const getMeetingInvitation = async (req, res) => {
    console.log("get meeting invitation function called")

    const MONGO_URI = "mongodb+srv://celinabarry:8Y9DQAAzsIUqHWXr@cluster0.e9wwre8.mongodb.net/?retryWrites=true&w=majority";
    console.log("MONGO_URI: ", MONGO_URI);
    const { id } = req.params;
    const { email } = req.params;
   
    console.log("Email parameter:", email);
    
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
        const { zoom_user_id, zoom_token, token_expiry } = user;
        const currentTime = Math.floor(Date.now() / 1000);
        console.log("current time: ", currentTime, "token_expiry: ", token_expiry)
        if (currentTime >= token_expiry) {
            const refreshedUser = await refreshTokenForUser(email);
            if (refreshedUser.status !== 200) {
                return res.status(500).json({ message: 'Error refreshing Zoom token' });
            }
            zoom_token = refreshedUser.data.zoom_token;
            console.log("refreshed zoom token: ", zoom_token)
            console.log('Token to be used for Zoom API call:', zoom_token);
        }
        const zoomApiUrl = `https://api.zoom.us/v2/meetings/${id}/invitation`;
        const zoomApiHeaders = {
            'Authorization': `Bearer ${zoom_token}`,
            'Content-Type': 'application/json',
        };

        const response = await axios.get(zoomApiUrl, {
            headers: zoomApiHeaders,
        });

        const zoomData = response.data;
        console.log("meeting invitation data: ", zoomData)
        return res.status(200).json(zoomData);
        
    } catch (error) {
        console.error('Error getting Zoom meeting invitation:', error);
        return res.status(500).json({ message: 'Error getting Zoom meeting invitation' });
    } finally {
        client.close();
    }
};


const deleteMeeting = async (req, res) => {
    console.log("delete meeting function called")

    const MONGO_URI = "mongodb+srv://celinabarry:8Y9DQAAzsIUqHWXr@cluster0.e9wwre8.mongodb.net/?retryWrites=true&w=majority";
    console.log("MONGO_URI: ", MONGO_URI);
    const { id } = req.params;
    const { email } = req.params;
   
    console.log("Email parameter:", email);
    
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
        const { zoom_user_id, zoom_token, token_expiry } = user;
        const currentTime = Math.floor(Date.now() / 1000);
        console.log("current time: ", currentTime, "token_expiry: ", token_expiry)
        if (currentTime >= token_expiry) {
            const refreshedUser = await refreshTokenForUser(email);
            if (refreshedUser.status !== 200) {
                return res.status(500).json({ message: 'Error refreshing Zoom token' });
            }
            zoom_token = refreshedUser.data.zoom_token;
            console.log("refreshed zoom token: ", zoom_token)
            console.log('Token to be used for Zoom API call:', zoom_token);
        }
        const zoomApiUrl = `https://api.zoom.us/v2/meetings/${id}`;
        const zoomApiHeaders = {
            'Authorization': `Bearer ${zoom_token}`,
            'Content-Type': 'application/json',
        };

        const response = await axios.delete(zoomApiUrl, {
            headers: zoomApiHeaders,
        });

        const zoomData = response.data;
        console.log("deleted meeting data: ", zoomData)
        return res.status(200).json(zoomData);
        
    } catch (error) {
        console.error('Error deleting Zoom meetings:', error);
        return res.status(500).json({ message: 'Error deleting Zoom meeting' });
    } finally {
        client.close();
    }
};
const updateMeeting = async (req, res) => {
    console.log("Update Meeting function called");
    
    const MONGO_URI = "mongodb+srv://celinabarry:8Y9DQAAzsIUqHWXr@cluster0.e9wwre8.mongodb.net/?retryWrites=true&w=majority";
    console.log("MONGO_URI: ", MONGO_URI);
    const { id } = req.params;
    
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

        const zoomApiUrl = `https://api.zoom.us/v2/meetings/${id}`;
        console.log("zoomApiUrl: ", zoomApiUrl)
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

        const response = await axios.patch(zoomApiUrl, zoomMeetingData, {
            headers: zoomApiHeaders,
        });

        const zoomData = response.data;
        console.log("zoomData after axios patch: ", zoomData)
        return res.status(204).json(zoomData);
    } catch (error) {
        console.error('Error updating Zoom meeting:', error);
        return res.status(500).json({ message: 'Error updating Zoom meeting' });
    } finally {
        client.close();
    }
};
const getPastMeeting = async (req, res) => {
    console.log("get past meeting by id function called")

    const MONGO_URI = "mongodb+srv://celinabarry:8Y9DQAAzsIUqHWXr@cluster0.e9wwre8.mongodb.net/?retryWrites=true&w=majority";
    console.log("MONGO_URI: ", MONGO_URI);
    const { id } = req.params;
    const { email } = req.params;
   
    console.log("Email parameter:", email);
    
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
        const { zoom_user_id, zoom_token, token_expiry } = user;
        const currentTime = Math.floor(Date.now() / 1000);
        console.log("current time: ", currentTime, "token_expiry: ", token_expiry)
        if (currentTime >= token_expiry) {
            const refreshedUser = await refreshTokenForUser(email);
            if (refreshedUser.status !== 200) {
                return res.status(500).json({ message: 'Error refreshing Zoom token' });
            }
            zoom_token = refreshedUser.data.zoom_token;
            console.log("refreshed zoom token: ", zoom_token)
            console.log('Token to be used for Zoom API call:', zoom_token);
        }
        const zoomApiUrl = `https://api.zoom.us/v2/meetings/${id}`;
        const zoomApiHeaders = {
            'Authorization': `Bearer ${zoom_token}`,
            'Content-Type': 'application/json',
        };

        const response = await axios.get(zoomApiUrl, {
            headers: zoomApiHeaders,
        });

        const zoomData = response.data;
        console.log("Single past meeting data: ", zoomData)
        if (zoomData.start_time) {
            zoomData.start_time = moment(zoomData.start_time).format('YYYY-MM-DDTHH:mm');
            console.log("start_time: ", zoomData.start_time)
        }
        return res.status(200).json(zoomData);
        
    } catch (error) {
        console.error('Error getting Zoom meetings:', error);
        return res.status(500).json({ message: 'Error getting Zoom meeting' });
    } finally {
        client.close();
    }
};
const getMeetingsById = async (req, res) => {
    console.log("get meeting by id function called")

    const MONGO_URI = "mongodb+srv://celinabarry:8Y9DQAAzsIUqHWXr@cluster0.e9wwre8.mongodb.net/?retryWrites=true&w=majority";
    console.log("MONGO_URI: ", MONGO_URI);
    const { id } = req.params;
    const { email } = req.params;
   
    console.log("Email parameter:", email);
    
    const client = new MongoClient(MONGO_URI, options);
    
    try {
        await client.connect();
        const db = client.db('final-project');
        
        // Retrieve user's data from MongoDB
        const user = await db.collection('users').findOne({ "email": email });
        //console.log("user: ", user)
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const { zoom_user_id, zoom_token, token_expiry } = user;
        const currentTime = Math.floor(Date.now() / 1000);
        console.log("current time: ", currentTime, "token_expiry: ", token_expiry)
        if (currentTime >= token_expiry) {
            const refreshedUser = await refreshTokenForUser(email);
            if (refreshedUser.status !== 200) {
                return res.status(500).json({ message: 'Error refreshing Zoom token' });
            }
            zoom_token = refreshedUser.data.zoom_token;
            //console.log("refreshed zoom token: ", zoom_token)
            //console.log('Token to be used for Zoom API call:', zoom_token);
        }
        const zoomApiUrl = `https://api.zoom.us/v2/meetings/${id}`;
        const zoomApiHeaders = {
            'Authorization': `Bearer ${zoom_token}`,
            'Content-Type': 'application/json',
        };

        const response = await axios.get(zoomApiUrl, {
            headers: zoomApiHeaders,
        });

        const zoomData = response.data;
        //console.log("Single meeting data: ", zoomData)
        if (zoomData.start_time) {
            zoomData.start_time = moment(zoomData.start_time).format('YYYY-MM-DDTHH:mm');
            console.log("start_time: ", zoomData.start_time)
        }
        return res.status(200).json(zoomData);
        
    } catch (error) {
        console.error('Error getting Zoom meetings:', error);
        return res.status(500).json({ message: 'Error getting Zoom meeting' });
    } finally {
        client.close();
    }
};
   
const getMeetings = async (req, res) => {
    console.log("get Meetings function called");
    
    const MONGO_URI = "mongodb+srv://celinabarry:8Y9DQAAzsIUqHWXr@cluster0.e9wwre8.mongodb.net/?retryWrites=true&w=majority";
    console.log("MONGO_URI: ", MONGO_URI);
    
    const { email } = req.params;
    console.log("Email parameter:", email);
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
        const { zoom_user_id, token_expiry } = user;
        let { zoom_token } = user;
        const currentTime = Math.floor(Date.now() / 1000);
        console.log("current time: ", currentTime, "token_expiry: ", token_expiry)
        if (currentTime >= token_expiry) {
            const refreshedUser = await refreshTokenForUser(email);
            console.log("refreshed user: ", refreshedUser)
            if (!refreshedUser) {
                return res.status(500).json({ message: 'Error refreshing Zoom token' });
            }
            zoom_token = refreshedUser.data.zoom_token;
            console.log("refreshedUser.data.zoom_token: ", refreshedUser.data.zoom_token)
            console.log("refreshed zoom token: ", zoom_token)
        }

        const zoomApiUrl = `https://api.zoom.us/v2/users/${zoom_user_id}/meetings`;
        const zoomApiHeaders = {
            'Authorization': `Bearer ${zoom_token}`,
            'Content-Type': 'application/json',
        };

        const response = await axios.get(zoomApiUrl, {
            headers: zoomApiHeaders,
        });

        const zoomData = response.data;
        return res.status(200).json(zoomData);
    } catch (error) {
        console.error('Error getting Zoom meetings:', error);
        return res.status(500).json({ message: 'Error getting Zoom meeting' });
    } finally {
        client.close();
    }
};

const createMeeting = async (req, res) => {
    console.log("Create Meeting function called");
    // const ASANA_BEARER_TOKEN = "1157497543118731";
    // const ASANA_WORKSPACE_GID = "1157497543118737";
    // const ASANA_PROJECT_GID = "1205429075631746";
    
    const MONGO_URI = "mongodb+srv://celinabarry:8Y9DQAAzsIUqHWXr@cluster0.e9wwre8.mongodb.net/?retryWrites=true&w=majority";
    console.log("MONGO_URI: ", MONGO_URI);
    
    const { email } = req.params;
    const { topic, agenda, start_time, timezone } = req.body;
    console.log("Email parameter:", email);
    console.log("form body", req.body);
    
    const mongoClient = new MongoClient(MONGO_URI, options);
    
    try {
        await mongoClient.connect();
        const db = mongoClient.db('final-project');
        
        // Retrieve user's data from MongoDB
        const user = await db.collection('users').findOne({ "email": email });
        console.log("user: ", user)
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
     
        const { zoom_user_id, token_expiry } = user;
        let { zoom_token } = user;
        const currentTime = Math.floor(Date.now() / 1000);
        console.log("current time: ", currentTime, "token_expiry: ", token_expiry)
        if (currentTime >= token_expiry) {
            const refreshedUser = await refreshTokenForUser(email);
            console.log("refreshed user: ", refreshedUser)
            if (!refreshedUser) {
                return res.status(500).json({ message: 'Error refreshing Zoom token' });
            }
            zoom_token = refreshedUser.data.zoom_token;
            console.log("refreshedUser.data.zoom_token: ", refreshedUser.data.zoom_token)
            console.log("refreshed zoom token: ", zoom_token)
        }
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


        // const asanaClient = Asana.Client.create().useAccessToken(ASANA_BEARER_TOKEN);

        // const taskData = {
        //     workspace: ASANA_WORKSPACE_GID,
        //     projects: ASANA_PROJECT_GID,
        //     name: `new meeting: ${topic}`,
        //     notes: `Join URL: ${zoomData.join_url}\nMeeting ID: ${zoomData.id}\nAgenda: ${agenda}`,
        //     due_on: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        // };

        // const asanaTask = await asanaClient.tasks.create(taskData);

        // const combinedData = {
        //     zoom: zoomData,
        //     asana: asanaTask.gid  // or asanaTask if you want to store the full task data.
        // };
        // await db.collection('Meetings').insertOne(combinedData);

        return res.status(201).json(zoomData);

    } catch (error) {
        console.error('Error creating Zoom meeting:', error);
        return res.status(500).json({ message: 'Error creating Zoom meeting' });
    } finally {
        mongoClient.close();
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
                    const currentTime = Math.floor(Date.now() / 1000);  
                    const tokenExpiryTimestamp = currentTime + tokenResponse.expires_in;
                    console.log("tokenExpiryTimestamp: ", tokenExpiryTimestamp)
                    await db.collection('users').updateOne(
                        { _id: result._id},
                        { 
                            $set: { 
                                "zoom_token": tokenResponse.access_token,
                                "token_expiry": tokenExpiryTimestamp  
                            } 
                        }
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
    const currentTimestamp = Math.floor(Date.now() /1000);
    

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
        const { access_token, expires_in } = request.data;
        const tokenExpiryTimestamp = currentTimestamp + expires_in;
        console.log("TokenExpiryTimestamp from get token: ", tokenExpiryTimestamp)
        return { access_token, expires_in, tokenExpiryTimestamp, error: null };
    } catch (error) {
        console.error("Error fetching token:", error);

        return { access_token: null, expires_in: null, error }
    }
};
const createUser = async (req, res) => {
    console.log("Create new user function called ")
    const MONGO_URI = "mongodb+srv://celinabarry:8Y9DQAAzsIUqHWXr@cluster0.e9wwre8.mongodb.net/?retryWrites=true&w=majority"

    console.log("MONGO_URI:", MONGO_URI);
    const client = new MongoClient(MONGO_URI, options);  
      
    try {
        await client.connect();
        const db = client.db("final-project");
        console.log("New user handler req.body: ", req.body)
        const { access_token, expires_in, tokenExpiryTimestamp, error } = await getToken(req.body.zoom_account_id, req.body.client_id, req.body.client_secret);

      if (!access_token) {
        return res.status(400).json({
            status: 400,
            message: "Error connecting your zoom account, please check your credentials, activate your zoom app, and try again."

        });
      }
      const zoomUserResponse = await axios.get(`https://api.zoom.us/v2/users/${req.body.email}`, {
        headers: {
            Authorization: `Bearer ${access_token}`
        }
      });
      const zoomUserData = zoomUserResponse.data;
      if (!zoomUserData) {
        return res.status(400).json({
            status: 400,
            message: "Error connecting your zoom user info, please check your credentials, activate your zoom app, and try again."
        });
    }
    const userDataToStore = {
        email: req.body.email,
        pw: req.body.pw,
        client_secret: req.body.client_secret,
        zoom_account_id: req.body.zoom_account_id,
        zoom_user_id: zoomUserData.id,
        zoom_token: access_token,
        client_id: req.body.client_id,
        token_expiry: tokenExpiryTimestamp
    };

      await db.collection("users").insertOne(userDataToStore);
    //   let defaultClient = Asana.ApiClient.instance;
    //   console.log("defaultclient: ", defaultClient)
    //   let oauth2 = defaultClient.authentications['oauth2'];
    //   oauth2.accessToken = '1/1157497543118731:c98ee3a67fe8157abb192c95260ccfe2';
    //   let apiInstance = new Asana.WorkspacesApi();
      
    //   let body = new Asana.WorkspaceGidAddUserBody.constructFromObject({
    //     data: {
    //       email: req.body.email
    //     }
    //   });
  
    //   let workspace_gid = "1157497543118737"; 
    //   let opts = {
    //     'opt_fields': ["email"]
    //   };
  
    //   apiInstance.addUserForWyorkspace(workspace_gid, body, opts, (error, data, response) => {
    //     if (error) {
    //       console.error("Error adding user to Asana:", error);
    //     } else {
    //       console.log('User added to Asana workspace. Returned data:', JSON.stringify(data, null, 2));
    //       let projectApi = new Asana.ProjectsApi();
    //       let projectBody = new Asana.ProjectGidAddMembersBody.constructFromObject({ data: { user: workspaceData.gid } }); // Assuming the returned user gid is under workspaceData.gid
    //       let project_gid = "1205429075631746";
    //       let projectOpts = { 
    //         'opt_fields': ["name", "email"] 
    //       };
  
    //       projectApi.addMembersForProject(project_gid, projectBody, projectOpts, (projectError, projectData, projectResponse) => {
    //         if (projectError) {
    //           console.error("Error adding user to Asana project:", projectError);
    //         } else {
    //           console.log('User added to Asana project. Returned data:', JSON.stringify(projectData, null, 2));
    //         }
    //       });
        // }
    //   });
  
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
            updateObject.client_id = clientId;
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

const refreshTokenForUser = async (email) => {
    console.log("refresh token for user called")
    const currentTimestamp = Math.floor(Date.now() /1000);
    const MONGO_URI = "mongodb+srv://celinabarry:8Y9DQAAzsIUqHWXr@cluster0.e9wwre8.mongodb.net/?retryWrites=true&w=majority";

    const client = new MongoClient(MONGO_URI, options);


    try {
        await client.connect();
        console.log("Connected to MongoDB");
        
        const db = client.db('final-project');
        const user = await db.collection('users').findOne({ email });

        if (user) {
            const {
                zoom_account_id,
                client_id,
                client_secret,
                token_expiry
            } = user;

            const tokenResponse = await getToken(zoom_account_id, client_id, client_secret);

            if (tokenResponse.access_token) {
                const tokenExpiryTimestamp = currentTimestamp + tokenResponse.expires_in;  
                await db.collection('users').updateOne(
                    { _id: user._id },
                    { 
                        $set: { 
                            "zoom_token": tokenResponse.access_token,
                            "token_expiry": tokenExpiryTimestamp
                        } 
                    }
                );
                
                return { status: 200, data: { ...user, zoom_token: tokenResponse.access_token } };

            } else {
                return { status: 500, message: 'Unable to fetch or update Zoom token' };
            }
        } else {
            return { status: 404, message: 'User not found' };
        }
    } catch (error) {
        console.error('Error refreshing token:', error);
        return { status: 500, message: 'Internal Server Error' };
    } finally {
        client.close();
    }
};


module.exports = {
    getUserByEmail,
    createUser,
    updateUser,
    createMeeting,
    updateMeeting,
    getMeetings,
    getMeetingsById,
    refreshTokenForUser,
    getPastMeeting,
    deleteMeeting,
    getMeetingInvitation
};