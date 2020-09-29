import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';
import {API_URL} from './config';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddAlbum from './components/AddAlbum';
import MyAlbumsList from './components/MyAlbumsList';
import {Switch, Route, withRouter} from 'react-router-dom';
import Stats from './components/MyAlbums/Stats';
import Signin from './components/User/Signin';
import Signup from './components/User/Signup';
import Home from './components/Home';

function App() {

  // Add authentication & bootstrap for signin/signup
  // Styles
  // API Limit? Insert pagination: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Third_party_APIs
  // Add functionality letter-btns
  // Stats for artist occurence
  // Disable double add -> if you click an album that is already there, make a modal appear 'already added'
  // Search on albumname OR on artistname

  const [artists, setArtists] = useState(null);
  const [albums, setAlbums] = useState(null);
  const [showArtists, setShowA] = useState(true);
  const [myAlbums, setMyAlbums] = useState(null);
  const [myFilteredAlbums, setFiltered] = useState(null);
  const [showAlbums, setShowAlbum] = useState(true);
  const [ToMyList, setToMyList] = useState(false);
  const [albumGenres, setGenres] = useState(null);

  useEffect(() => {
    axios.get(`${API_URL}/my-albums`)
      .then((result) => {
        const sorted = sortData(result.data);
        setMyAlbums(sorted);
        setFiltered(sorted);
      }).catch((err) => {
        
      });
  }, []);

  const sortData = (arr) => {
    let newArr = arr.sort((a,b) => {
      let nameA = a.artist[0].name.toUpperCase(); 
      let nameB = b.artist[0].name.toUpperCase(); 
      if (nameA.includes('THE ', 0)) {nameA = nameA.substring(4)};
      if (nameB.includes('THE ', 0)) {nameB = nameB.substring(4)};
      if (nameA < nameB) {
        return -1;
      } else if (nameA > nameB) {
        return 1;
      } else {
        return 0;
      }
    });
    return newArr;
  };

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
  };

  //Not implemented
  const handleAlbumSearch = (album) => {
    // axios.post(`${API_URL}/albums-search`, {albumName: album})
    //   .then((result) => {
    //     console.log(result.data)
    //   }).catch((err) => {
    //     // Artists not found message
    //     console.log(err)
    //   });
  };

  const handlePickArtist = (artist) => {
    setShowA(false);
    setShowAlbum(true);
    setGenres(artist.genres);
    axios.get(`${API_URL}/albums/${artist.id}`)
      .then((result) => {
        console.log(result.data)
        setAlbums(result.data);
      }).catch((err) => {
         // Albums not found message
      });
  };

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
        let clonedFilteredAlbums = JSON.parse(JSON.stringify(myFilteredAlbums));
        clonedmyAlbums.push(result.data);
        clonedFilteredAlbums.push(result.data);
        let sorted = sortData(clonedmyAlbums);
        let filteredSorted = sortData(clonedFilteredAlbums);
        setFiltered(filteredSorted);
        setMyAlbums(sorted);
        setGenres(null);
        setToMyList(false);
      }).catch((err) => {
        // Can't add album message
      });
  };

  const handleMyAlbumsSearch = (e) => {
    let value = e.currentTarget.value.toUpperCase();
    let filtered = myAlbums.filter((album) => {
      let albumName = album.name.toUpperCase();
      let artistName = album.artist[0].name.toUpperCase();
      return (albumName.includes(value) || artistName.includes(value));
    })
    console.log(filtered)
    setFiltered(filtered);
  };

  const handleSortGenre = (e) => {
    const selectedGenre = e.currentTarget.innerText.toLowerCase();
    console.log(selectedGenre)
    if (selectedGenre === 'show all') {
      setFiltered(myAlbums);
      return;
    };
    let genreAlbums = myAlbums.reduce((arr, album) => {
      let genreFound = false;
      album.genres.map((genre) => {
        if (genre.includes(selectedGenre)) {genreFound = true}; 
      });
      if (genreFound === true) {arr.push(album)};
      return arr;
    }, []);
    console.log(genreAlbums)
    setFiltered(genreAlbums);
  };

  return (
   
    <Switch>
      <Route exact path="/" render={() => {
        return <Home />
      }}/>
      <Route path="/myhome" render={() => {
        return <MyAlbumsList myAlbums={myFilteredAlbums} searchMyAlbums={handleMyAlbumsSearch} sortGenre={handleSortGenre}/>
      }}/>
      <Route path="/add-album" render={() => {
        return <AddAlbum handleArtistSearch={handleArtistSearch} handleAlbumSearch={handleAlbumSearch} artists={artists} handlePickArtist={handlePickArtist} showArtists={showArtists} showAlbums={showAlbums} albums={albums} handleAdd={handleAdd} toMyList={ToMyList} myAlbums={myAlbums}/>
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
  );
}

export default withRouter(App);
