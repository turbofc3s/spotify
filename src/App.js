import React, { useState, useEffect } from 'react'
import axios from 'axios';
// css file used in react boostrap library components need access to this css file
import 'bootstrap/dist/css/bootstrap.min.css';
// to use component library
import { Container, InputGroup, FormControl, Button, Row, Card} from 'react-bootstrap';


function App() { 
  // console.log(process.env.REACT_APP_client_id)
  
var client_id = process.env.REACT_APP_client_id; // Your client id
var client_secret = process.env.REACT_APP_client_secret; // Your secret

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
    console.log(tokenResponse.data);
    setToken(tokenResponse.data.access_token);
    });  
 }, []);

// Search
async function search() {
  // console.log('Search for ' + searchInput); // Usher
// get request using search to get artist id then return and save in a variable
//
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
    console.log(tokenResponse.data);
    setToken(tokenResponse.data.access_token);
    });  
 

let artistID = await axios('https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist', searchParameters)
    .then(searchResponse => {
    console.log(searchResponse)
    return searchResponse.data.artists.items[0].id          
   });
    console.log(token)
   console.log('Artistid is ' + artistID )


await axios('https://api.spotify.com/v1/artists/' + artistID + '/top-tracks' + '?market=US', searchParameters)
   .then(searchResponse => {
    console.log(searchResponse)
    setTracks(searchResponse.data.tracks)
   }) ;  
} 

 // const handlePlay = () => {
 //   // if (tracks[i]) //function on an array that lets you perfom a functiton on each element of the array
 //    // const newTracks = tracks.map((track,i) => {
 //    //   return (
 //    //     <div key={i}>{track}</div>
 //    //     );
 //    // });

 //  // return <div>{newTracks}</div>;

 //     {
 //      window.open(tracks[0].external_urls.spotify, '_blank')
 //   }

 
 // } 
// console.log(tracks)

  return (
    <div className='App'>      
      <Container>
        <h1>Spotify App</h1>
        <InputGroup className='mb-3' size='lg' >
           <FormControl
             placeholder="Search An Artist For Top Tracks"
             type='input'
             onKeyPress={event => {
              if (event.key == 'Enter') {
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
                <Card.Title><a href= {tracks[i].external_urls.spotify} target='_blank'>{tracks[i].name}</a></Card.Title>
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


