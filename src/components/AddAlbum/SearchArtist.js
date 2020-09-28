import React, {useState} from 'react';
import {InputGroup, FormControl, Button} from 'react-bootstrap';
import './SearchArtists.css';

export default function SearchArtist(props) {

  const [artist, setArtist] = useState(null);

  const handleChange = (e) => {
    let artistName = e.currentTarget.value;
    setArtist(artistName);
  }

  return (
    <InputGroup>
      <FormControl type="text" placeholder="What is the artists name?" name="artistName" onChange={handleChange}></FormControl>
      <InputGroup.Append>
      <Button onClick={() => props.onSearch(artist)}>Search artist</Button>
      </InputGroup.Append>
    </InputGroup>
  )
}
