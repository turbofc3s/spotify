import React, { useState, useEffect } from 'react'
import axios from 'axios';

function musicData () {

var client_id = process.env.REACT_APP_client_id; 
var client_secret = process.env.REACT_APP_client_secret; 

 const [token, setToken] = useState('');
 const [searchInput, setSearchInput] = useState('');
 const [tracks, setTracks] = useState([])

 useEffect (() => {
  axios('https://accounts.spotify.com/api/token', {
    headers: {
      'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret),
      'Content-Type' :' application/x-www-form-urlencoded'
    },
    data: 'grant_type=client_credentials',
    method: 'POST'    
       })
  .then(tokenResponse => {
    setToken(tokenResponse.data.access_token);
    });  
 }, [client_id, client_secret]);

async function search() {

let searchParameters = {
  method: 'GET',
  headers: {
    'Authorization':'Bearer ' +  token}
  }

axios('https://accounts.spotify.com/api/token', {
    headers: {
      'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret),
      'Content-Type' :' application/x-www-form-urlencoded'
    },
    data: 'grant_type=client_credentials',
    method: 'POST'    
   })
  .then(tokenResponse => {
    setToken(tokenResponse.data.access_token);
    });  
 

let artistID = await axios('https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist', searchParameters)
    .then(searchResponse => {
    return searchResponse.data.artists.items[0].id          
   });
    
await axios('https://api.spotify.com/v1/artists/' + artistID + '/top-tracks?market=US', searchParameters)
   .then(searchResponse => {
    setTracks(searchResponse.data.tracks)
   }) ;  
} 

export default musicData;


