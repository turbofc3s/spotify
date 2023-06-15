import React, { useState, useEffect } from 'react'
import axios from 'axios';

function App() {  

var client_id = 'e700c58ae14e4e0db1a89f152c923f9e'; // Your client id
var client_secret = 'e97bc1e59edf485eaff0238479fe4bd0'; // Your secret

 const [token, setToken] = useState('')

 useEffect(() => {
  axios('https://accounts.spotify.com/api/token', {
    headers: {
    'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret),
    'Content-Type' :' application/x-www-form-urlencoded'
  },
    data: 'grant_type=client_credentials',
    method: 'POST'
  })
  .then(tokenResponse => {
    console.log(tokenResponse.data.expires_in);
    setToken(tokenResponse.data.access_token);
});

}, []);


  return <div>{token}</div>        
} 

export default App;

