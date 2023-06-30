import React, { useState, useEffect } from 'react'
import axios from 'axios';
// css file used in react boostrap library components need access to this css file
import 'bootstrap/dist/css/bootstrap.min.css';
// to use component library
import { Container, InputGroup, FormControl, Button, Row, Card} from 'react-bootstrap';

function App() {  

var client_id = 'e700c58ae14e4e0db1a89f152c923f9e'; // Your client id
var client_secret = 'e97bc1e59edf485eaff0238479fe4bd0'; // Your secret

 const [token, setToken] = useState('');
 const [searchTrack, setSearchTrack] = useState('');
 const [searchInput, setSearchInput] = useState('');

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
    console.log(tokenResponse.data);
    setToken(tokenResponse.data.access_token);


  axios('https://api.spotify.com/v1/search?q=Usher&type=album,track', {
    method: 'GET',
    headers: {
      'Authorization':'Bearer ' +  tokenResponse.data.access_token},
    // params: {
    //   query: 'janet jackson'
    // }
    })
   .then(searchResponse => {
    console.log(searchResponse)
     setSearchTrack(searchResponse.data.albums.items[0].images[1].url )
   }) ; 
  });  
 }, []);

  return (
    <div className='App'>      
      <Container>
        <h1>Spotify App</h1>
        <InputGroup className='mb-3' size='lg' >
           <FormControl
             placeholder="Search For Artist"
             type='input'
             onKeyPress={event => {
              if (event.key == 'Enter') {
                console.log('Pressed Enter');
              }
             }}
             onChange={event => setSearchInput(event.target.value)}
           />
           <Button onClick={() => {console.log('Clicked Button')}}>
             Search
           </Button>
        </InputGroup>
      </Container>
      <Container>
        <Row className="mx-2 row row-cols-4">
          <Card>
            <Card.Img src='#' />
            <Card.Body>
              <Card.Title>Album name</Card.Title>
            </Card.Body>
          </Card>  
        </Row>         
      </Container>
    </div> 
  );          
} 

export default App;


