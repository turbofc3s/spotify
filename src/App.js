import React, { useState, useEffect } from 'react'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Card, Row} from 'react-bootstrap';

function App() { 
  
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
 }, []);

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

  return (
    
    <div className='App'>      
      <Container>
        <h1>Spotify App</h1>
        <InputGroup className='mb-3' size='lg' >
           <FormControl
             placeholder="Search An Artist For Top Tracks"
             type='input'
             onKeyPress={event => {
              if (event.key === 'Enter') {
                search(); 
              }
             }}
             onChange={event => setSearchInput(event.target.value)}
           />
           <Button onClick={search}>
             Search
           </Button>
        </InputGroup>
      </Container>      
      <Container>
        <Row className="mx-2 row row-cols-4">
          {tracks.map( ( track, i) => {            
            return (
              <Card key={i}>
              <Card.Img src={tracks[i].album.images[0].url} />
              <Card.Body>
                <Card.Title><a href= {tracks[i].external_urls.spotify} target='_blank' rel="noreferrer">{tracks[i].name}</a></Card.Title>
              </Card.Body>
            </Card>
            )
          })}                      
        </Row>         
      </Container>
    </div> 
  );          
} 

export default App;



