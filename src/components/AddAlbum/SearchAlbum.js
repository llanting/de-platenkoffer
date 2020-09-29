import React, {useState} from 'react';
import {InputGroup, FormControl, Button} from 'react-bootstrap';
import './SearchArtists.css';

export default function SearchAlbum(props) {

  const [album, setAlbum] = useState(null);

  const handleChange = (e) => {
    let albumName = e.currentTarget.value;
    setAlbum(albumName);
  }

  return (
    <InputGroup>
      <FormControl type="text" placeholder="What is the albums name?" name="albumName" onChange={handleChange}></FormControl>
      <InputGroup.Append>
      <Button onClick={() => props.onAlbumSearch(album)}>Search artist</Button>
      </InputGroup.Append>
    </InputGroup>
  )
}
