import React from 'react';
import {Button, Card} from 'react-bootstrap';
import moment from 'moment';
import './MyAlbumList.css';
import Nav from './Nav';
import SearchMyAlbums from './MyAlbums/SearchMyAlbums';

export default function MyAlbumsList(props) {

  const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g','h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

  if (!props.myAlbums) {
    return <p>Loading...</p>
  };

  return (
    <>
    <Nav />
    <div style={{display: 'flex'}} className="home-myAlbums">
      <div>
        <SearchMyAlbums searchMyAlbums={props.searchMyAlbums} sortGenre={props.sortGenre}/>
        <div className="myAlbumsList">
        {
          props.myAlbums.map((album, i) => {
            return <Card key={'myalbum' + i} style={{ width: '18rem' }}>
              <Card.Img src={album.image}/>
              <Card.Body className="card-body">
                <Card.Title>{album.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {
                    album.artist.map((art, i) => {
                      return <p key={'arti' + i}>{art.name}</p>;
                    })
                  }
                </Card.Subtitle>
                <Card.Text style={{fontSize: '12px'}}>
                  <br></br>
                  Release: {
                  moment(album.release_date).format('MMMM YYYY')
                  }
                </Card.Text>
              </Card.Body>
            </Card>
          })
        }
        </div>
      </div>
      <div style={{width: '10%', display: 'flex', flexDirection: 'column', justifyContent:'space-around', marginRight: '10px'}}>
        {
          alphabet.map((letter, i) => {
            return <Button key={'letter' + i}>{letter.toUpperCase()}</Button>
          })
        }
      </div>
    </div>
    </>
  )
}
