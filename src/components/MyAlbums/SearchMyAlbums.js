import React from 'react';
import {Dropdown} from 'react-bootstrap';
import './SearchMyAlbums.css';

export default function SearchMyAlbums(props) {

  return (
    <>
      <input type="text" onChange={props.searchMyAlbums} className="search-input" placeholder='Search by artist or album name'></input>
      <Dropdown className="dropdowner" >
        <Dropdown.Toggle id="dropdown-basic" className="dropDown-btn">
          Sort by genre
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={props.sortGenre}>Show All</Dropdown.Item>
          <Dropdown.Item onClick={props.sortGenre}>Blues</Dropdown.Item>
          <Dropdown.Item onClick={props.sortGenre}>Classic</Dropdown.Item>
          <Dropdown.Item onClick={props.sortGenre}>Disco</Dropdown.Item>
          <Dropdown.Item onClick={props.sortGenre}>Electronic</Dropdown.Item>
          <Dropdown.Item onClick={props.sortGenre}>Hiphop</Dropdown.Item>
          <Dropdown.Item onClick={props.sortGenre}>Jazz</Dropdown.Item>
          <Dropdown.Item onClick={props.sortGenre}>Soul</Dropdown.Item>
          <Dropdown.Item onClick={props.sortGenre}>Soundtrack</Dropdown.Item>
          <Dropdown.Item onClick={props.sortGenre}>Pop</Dropdown.Item>
          <Dropdown.Item onClick={props.sortGenre}>Rock</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  )
}

