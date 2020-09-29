import React from 'react';
import ArtistList from './AddAlbum/ArtistList';
import AlbumsList from './AddAlbum/AlbumsList';
import SearchArtist from './AddAlbum/SearchArtist';
//import SearchAlbum from './AddAlbum/SearchAlbum';
import DefaultImg from '../bruno-emmanuelle-Gi6-m_t_W-E-unsplash.jpg';
import Nav from './Nav';
import {Modal, Button} from 'react-bootstrap';

export default function AddAlbum(props) {

  return (
    <>
    <Nav />
    <div>
      <Modal centered show={props.duplicate}>
        <Modal.Body>
          <p>You've already added this title!</p>
        </Modal.Body>
        <Button onClick={props.hide}>Close</Button>
      </Modal>
      <SearchArtist onSearch={props.handleArtistSearch}/>
      {/* or
      <SearchAlbum onAlbumSearch={props.handleAlbumSearch}/> */}
      <ArtistList artists={props.artists} chooseArtist={props.handlePickArtist} show={props.showArtists} DefaultImg={DefaultImg}/>
      <AlbumsList show={props.showAlbums} albums={props.albums} addAlbum={props.handleAdd} toMyList={props.toMyList} DefaultImg={DefaultImg} myAlbums={props.myAlbums}/>
    </div>
    </>
  )
}
