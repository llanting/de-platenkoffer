import React from 'react';
import './ArtistList.css';
import {Card} from 'react-bootstrap';

export default function ArtistList(props) {

  if (!props.show) {
    return <></>;
  }

  return (
    <div className="artistList">
    {
      !props.artists ? <p>Search for an artist</p> :
      props.artists.map((art, i) => {
        return <a style={{ cursor: 'pointer' }} className="artistBtn" onClick={() => {props.chooseArtist(art)}} key={'artist' + i}>
          <Card style={{ width: '18rem' }}>
            {
              art.images.length ? <Card.Img variant="top" src={art.images[0].url} /> : <Card.Img variant="top" src={props.DefaultImg} />
            }
            <Card.Body>
              <Card.Title>{art.name}</Card.Title>
            </Card.Body>
          </Card>
        </a>
      })
    }
    </div>
  )
}


