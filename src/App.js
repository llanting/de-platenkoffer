import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';
import {API_URL} from './config';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddAlbum from './components/AddAlbum';
import MyAlbumsList from './components/MyAlbumsList';
import {Switch, Route, withRouter} from 'react-router-dom';
import Stats from './components/Stats';
import Signin from './components/User/Signin';
import Signup from './components/User/Signup';
import Home from './components/Home';

function App() {

  // Add authentication & bootstrap for signin/signup
  // Styles
  // API Limit? Albums te weinig
  // Sort min 'the'
  // Deploy
  // Add search of myAlbums on artistname
  // Add functionality letter-btns
  // Stats for artist occurence
  // Disable double add
  // Searchbar artist || album name (search for both without selecting if it is an artist or album) || genre (R&B - hiphop, pop, rock, disco, jazz, electronic, )

  const [artists, setArtists] = useState(null);
  const [albums, setAlbums] = useState(null);
  const [showArtists, setShowA] = useState(true);
  const [myAlbums, setMyAlbums] = useState(null);
  const [showAlbums, setShowAlbum] = useState(true);
  const [ToMyList, setToMyList] = useState(false);
  const [albumGenres, setGenres] = useState(null);

  useEffect(() => {
    axios.get(`${API_URL}/my-albums`)
      .then((result) => {
        const sorted = sortData(result.data);
        setMyAlbums(sorted);
      }).catch((err) => {
        
      });
  }, [])

  const sortData = (arr) => {
    let newArr = arr.sort((a,b) => {
      const nameA = a.artist[0].name.toUpperCase(); 
      const nameB = b.artist[0].name.toUpperCase(); 
      if (nameA < nameB) {
        return -1;
      } else if (nameA > nameB) {
        return 1;
      } else {
        return 0;
      }
    });
    return newArr;
  }

  const handleArtistSearch = (artist) => {
    setShowA(true);
    setShowAlbum(false);
    axios.post(`${API_URL}/artist-search`, {artistName: artist})
      .then((result) => {
        setArtists(result.data);
      }).catch((err) => {
        // Artists not found message
        console.log(err)
      });
  }

  const handlePickArtist = (artist) => {
    setShowA(false);
    setShowAlbum(true);
    setGenres(artist.genres);
    axios.get(`${API_URL}/albums/${artist.id}`)
      .then((result) => {
        setAlbums(result.data.items);
      }).catch((err) => {
         // Albums not found message
      });
  }

  const handleAdd = (album) => {
    setToMyList(true);
    setAlbums(null);
    setArtists(null);
    const {artists, id, images, name, release_date} = album;

    let artistsArr = artists.reduce((arr, art) => {
      let newArt = {name: art.name, id: art.id};
      arr.push(newArt);
      return arr;
    }, []);

    axios.post(`${API_URL}/add-album`, {artists: artistsArr, id, image: images[0].url, name, release_date, genres: albumGenres})
      .then((result) => {
        let clonedmyAlbums = JSON.parse(JSON.stringify(myAlbums));
        clonedmyAlbums.push(result.data);
        let sorted = sortData(clonedmyAlbums);
        setMyAlbums(sorted);
        setGenres(null);
        setToMyList(false);
      }).catch((err) => {
        // Can't add album message
      });
  }

  return (
    <>
      <Switch>
        <Route exact path="/" render={() => {
          return <Home />
        }}/>
        <Route path="/myhome" render={() => {
          return <MyAlbumsList myAlbums={myAlbums}/>
        }}/>
        <Route path="/add-album" render={() => {
          return <AddAlbum handleArtistSearch={handleArtistSearch} artists={artists} handlePickArtist={handlePickArtist} showArtists={showArtists} showAlbums={showAlbums} albums={albums} handleAdd={handleAdd} toMyList={ToMyList} myAlbums={myAlbums}/>
        }}/>
        <Route path="/stats" render={() => {
          return <Stats myAlbums={myAlbums}/>
        }}/>
        <Route path="/signin" render={() => {
          return <Signin/>
        }}/>
        <Route path="/signup" render={() => {
          return <Signup/>
        }}/>
      </Switch>
    </>
  );
}

export default withRouter(App);
