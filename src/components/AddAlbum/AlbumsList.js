import React from 'react';
import './ArtistList.css';
import {Card} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';

export default function ArtistList(props) {

  if (props.toMyList) {
    return <Redirect to={'/myhome'}/>
  }

  if (!props.show) {
    return <></>;
  }

  return (
    <div className="artistList">
    {
      !props.albums ? <></> :
      props.albums.map((album, i) => {
        return <a id="add-card" style={{ cursor: 'pointer' }} className="artistBtn" onClick={() => {props.addAlbum(album)}} key={'albums' + i}>
          <Card style={{ width: '18rem' }}>
            {
              album.images.length ? <Card.Img variant="top" src={album.images[0].url} /> : <Card.Img variant="top" src={props.DefaultImg} />
            }
            <Card.Body>
              <Card.Title>{album.name}</Card.Title>
            </Card.Body>
          </Card>
        </a>
      })
    }
    </div>
  )
}

