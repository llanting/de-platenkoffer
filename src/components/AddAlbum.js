import React from 'react';
import ArtistList from './AddAlbum/ArtistList';
import AlbumsList from './AddAlbum/AlbumsList';
import SearchArtist from './AddAlbum/SearchArtist';
import DefaultImg from '../bruno-emmanuelle-Gi6-m_t_W-E-unsplash.jpg';
import Nav from './Nav';

export default function AddAlbum(props) {
  return (
    <>
    <Nav />
    <div>
      <SearchArtist onSearch={props.handleArtistSearch}/>
      <ArtistList artists={props.artists} chooseArtist={props.handlePickArtist} show={props.showArtists} DefaultImg={DefaultImg}/>
      <AlbumsList show={props.showAlbums} albums={props.albums} addAlbum={props.handleAdd} toMyList={props.toMyList} DefaultImg={DefaultImg} myAlbums={props.myAlbums}/>
    </div>
    </>
  )
}
